package com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.concurrent.CountDownLatch;
import java.util.List;

import com.frostwire.jlibtorrent.AlertListener;
import com.frostwire.jlibtorrent.LibTorrent;
import com.frostwire.jlibtorrent.SessionManager;
import com.frostwire.jlibtorrent.alerts.AddTorrentAlert;
import com.frostwire.jlibtorrent.alerts.Alert;
import com.frostwire.jlibtorrent.alerts.AlertType;
import com.frostwire.jlibtorrent.alerts.BlockFinishedAlert;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.MovieDownloadSocketHandler;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
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

    private final MovieDownloadSocketHandler movieDownloadSocketHandler;

    public JlibtorrentDownloader(MovieDownloadSocketHandler movieDownloadSocketHandler) {
        this.movieDownloadSocketHandler = movieDownloadSocketHandler;
    }

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
                            System.out.println("Progress: " + p + "% for torrent name: " + a.torrentName());
                            System.out.println(s.stats().totalDownload());
                            break;
                        case TORRENT_FINISHED:
                            System.out.println("Torrent finished");
                            signal.countDown();
                            break;

                    }
                }
            });
            s.start();
            File destDir = new File("/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies");
            s.download(magnetUrl, destDir);

            signal.await();

            s.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
