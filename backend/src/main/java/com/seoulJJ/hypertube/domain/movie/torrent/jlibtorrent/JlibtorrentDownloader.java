package com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent;

import org.springframework.beans.factory.annotation.Autowired;
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
import com.seoulJJ.hypertube.global.utils.VideoConverter;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.MovieDownloadSocketHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
@RequiredArgsConstructor
public class JlibtorrentDownloader {

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
    private final VideoConverter videoConverter;

    public void startDownloadWithMagnet(String magnetUrl) throws Throwable {
        try {
            StringBuilder builder = new StringBuilder(magnetUrl);
            trackerUrls.forEach(url -> builder.append("&tr=").append(url));
            magnetUrl = builder.toString();

            log.info("Using libtorrent version: " + LibTorrent.version());

            final SessionManager s = new SessionManager();

            final CountDownLatch signal = new CountDownLatch(1);

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
                            System.out.println("Torrent added");
                            movieDownloadSocketHandler.addTorrent("8CE082224BE3026057F0DB523725F6530939FF3E");
                            ((AddTorrentAlert) alert).handle().resume();
                            break;
                        case BLOCK_FINISHED:
                            BlockFinishedAlert a = (BlockFinishedAlert) alert;
                            int p = (int) (a.handle().status().progress() * 100);
                            movieDownloadSocketHandler.sendMessage("8CE082224BE3026057F0DB523725F6530939FF3E",
                                    p + "% for torrent name: " + a.torrentName());

                            break;
                        case TORRENT_FINISHED:
                            System.out.println("Torrent finished");
                            movieDownloadSocketHandler.sendMessage("8CE082224BE3026057F0DB523725F6530939FF3E",
                                    "Torrent finished");
                            movieDownloadSocketHandler.removeTorrent("8CE082224BE3026057F0DB523725F6530939FF3E");
                            signal.countDown();
                            break;

                    }
                }
            });

            s.start();
            String imdbId = "tt4291600";
            File destDir = new File("/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies" + "/" + imdbId);
            if (!destDir.exists()) {
                destDir.mkdirs();
            }
            s.download(magnetUrl, destDir);

            signal.await();

            s.stop();

            File videoFile = restructureFiles(imdbId, destDir);

            videoConverter.convertVideo(videoFile,
                    destDir.getPath());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private File restructureFiles(String imdbId, File rootDirectory) {

        // 특정 숫자로 시작하는 파일 이름을 지정
        String newFileName = imdbId + ".mp4";

        // 주어진 디렉터리 아래에서 .mp4 파일을 찾음
        if (rootDirectory.exists() && rootDirectory.isDirectory()) {
            File[] files = rootDirectory.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isFile() && file.getName().toLowerCase().endsWith(".mp4")) {
                        try {
                            // .mp4 파일을 특정 디렉터리로 옮기고 이름 변경
                            Files.move(file.toPath(), new File(rootDirectory.getPath(), newFileName).toPath(),
                                    StandardCopyOption.REPLACE_EXISTING);
                            break; // 하나의 .mp4 파일을 찾았으므로 반복문 종료
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
                }
            }
        }

        return new File(rootDirectory, newFileName);
    }

}
