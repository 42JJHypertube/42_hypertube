package com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.concurrent.CountDownLatch;
import java.util.List;
import java.io.IOException;
import java.nio.file.StandardCopyOption;
import java.nio.file.Files;

import com.frostwire.jlibtorrent.AlertListener;
import com.frostwire.jlibtorrent.LibTorrent;
import com.frostwire.jlibtorrent.SessionManager;
import com.frostwire.jlibtorrent.alerts.AddTorrentAlert;
import com.frostwire.jlibtorrent.alerts.Alert;
import com.frostwire.jlibtorrent.alerts.AlertType;
import com.frostwire.jlibtorrent.alerts.BlockFinishedAlert;
import com.frostwire.jlibtorrent.alerts.PeerBanAlert;
import com.frostwire.jlibtorrent.alerts.PeerConnectAlert;
import com.frostwire.jlibtorrent.alerts.PeerDisconnectedAlert;
import com.seoulJJ.hypertube.domain.movie.MovieDownDto;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFile;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFileManager;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.MovieDownloadSocketHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import java.nio.file.FileVisitResult;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;

@Log4j2
@Component
@RequiredArgsConstructor
public class JlibtorrentDownloader {

    @Value("${spring.file_path.movies}")
    private String movieDir;

    private final List<String> trackerUrls = List.of(
            "udp://93.158.213.92:1337/announce",
            "udp://23.137.251.46:6969/announce",
            "udp://23.134.90.6:1337/announce",
            "udp://185.243.218.213:80/announce",
            "udp://89.234.156.205:451/announce",
            "udp://107.189.11.58:6969/announce",
            "udp://208.83.20.20:6969/announce",
            "udp://83.146.98.78:6969/announce",
            "udp://109.201.134.183:80/announce",
            "udp://198.100.149.66:6969/announce",
            "udp://23.157.120.14:6969/announce",
            "udp://222.84.21.178:6969/announce",
            "udp://220.130.15.30:6969/announce");

    @Autowired
    private final MovieDownloadSocketHandler movieDownloadSocketHandler;

    @Autowired
    private final VideoFileManager videoFileManager;

    public void startDownloadWithMagnet(MovieDownDto movieDownDto) throws Throwable {
        try {
            StringBuilder builder = new StringBuilder(movieDownDto.getMagnetUrl());
            trackerUrls.forEach(url -> builder.append("&tr=").append(url));
            String magnetUrl = builder.toString();

            log.info("Using libtorrent version: " + LibTorrent.version());

            final SessionManager s = new SessionManager();

            final CountDownLatch signal = new CountDownLatch(1);

            String torrentHash = movieDownDto.getTorrentHash();

            s.addListener(new AlertListener() {
                @Override
                public int[] types() {
                    return null;
                }

                @Override
                public void alert(Alert<?> alert) {
                    AlertType type = alert.type();
                    switch (type) {
                        case ADD_TORRENT:
                            log.info("Torrent added");
                            movieDownloadSocketHandler.addTorrent(torrentHash);
                            ((AddTorrentAlert) alert).handle().resume();
                            break;
                        case BLOCK_FINISHED:
                            BlockFinishedAlert a = (BlockFinishedAlert) alert;
                            int p = (int) (a.handle().status().progress() * 100);
                            movieDownloadSocketHandler.sendMessage(torrentHash,
                                    p + "% for torrent name: " + a.torrentName());
                            break;
                        case PEER_BAN:
                            PeerBanAlert pba = (PeerBanAlert) alert;
                            log.info("Peer banned " + pba.handle().peerInfo());
                            break;
                        case PEER_CONNECT:
                            PeerConnectAlert pca = (PeerConnectAlert) alert;
                            log.info("Peer connected " + pca.handle().peerInfo());
                            break;
                        case PEER_DISCONNECTED:
                            PeerDisconnectedAlert pda = (PeerDisconnectedAlert) alert;
                            log.info("Peer disconnected " + pda.handle().peerInfo());
                            break;
                        case TORRENT_FINISHED:
                            log.info("Torrent finished");
                            signal.countDown();
                            movieDownloadSocketHandler.sendMessage(torrentHash,
                                    "Torrent finished");
                            movieDownloadSocketHandler.removeTorrent(torrentHash);
                            break;

                    }
                }
            });

            // s.start();
            String imdbId = movieDownDto.getImdbId();
            File destDir = new File("/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies" + "/" + imdbId);
            if (!destDir.exists()) {
                destDir.mkdirs();
            }
            // log.info("Trying to download torrent: " + magnetUrl);
            // s.download(magnetUrl, destDir);
            // log.info("Downloading torrent: " + magnetUrl);
            // signal.await();

            // log.info("Trying to stop session");
            // s.stop();
            // log.info("Session stopped");

            VideoFile videoFile = restructureFiles(imdbId, destDir);

            videoFileManager.convertVideoToHls(videoFile,
                    destDir.getPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private VideoFile restructureFiles(String imdbId, File rootDirectory) {

        // 특정 숫자로 시작하는 파일 이름을 지정
        String newFileName = imdbId + ".mp4";

        if (rootDirectory.exists() && rootDirectory.isDirectory()) {
            try {
                Files.walkFileTree(rootDirectory.toPath(), new SimpleFileVisitor<Path>() {
                    @Override
                    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                        log.info("Checking file: " + file.getFileName());
                        if (file.toFile().isFile() && file.getFileName().toString().toLowerCase().endsWith(".mp4")) {
                            log.info("Found .mp4 file: " + file.getFileName());
                            try {
                                // .mp4 파일을 특정 디렉터리로 복사하고 이름 변경
                                Files.copy(file, new File(rootDirectory, newFileName).toPath(),
                                        StandardCopyOption.REPLACE_EXISTING);
                                return FileVisitResult.TERMINATE; // 하나의 .mp4 파일을 찾았으므로 종료
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        return FileVisitResult.CONTINUE;
                    }
                });
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return new VideoFile(rootDirectory, newFileName);
    }
}
