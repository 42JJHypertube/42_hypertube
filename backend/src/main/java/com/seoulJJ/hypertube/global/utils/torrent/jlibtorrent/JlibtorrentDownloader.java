package com.seoulJJ.hypertube.global.utils.torrent.jlibtorrent;

import org.springframework.stereotype.Component;

import java.io.File;
import java.util.concurrent.CountDownLatch;

import com.frostwire.jlibtorrent.AlertListener;
import com.frostwire.jlibtorrent.LibTorrent;
import com.frostwire.jlibtorrent.SessionManager;
import com.frostwire.jlibtorrent.TorrentInfo;
import com.frostwire.jlibtorrent.alerts.AddTorrentAlert;
import com.frostwire.jlibtorrent.alerts.Alert;
import com.frostwire.jlibtorrent.alerts.AlertType;
import com.frostwire.jlibtorrent.alerts.BlockFinishedAlert;

import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
public class JlibtorrentDownloader {

    public void startDownload() throws Throwable {
        try {
            // comment this line for a real application
            String filePath = "/Users/kimjaehyuk/Downloads/Scrat.torrent";

            File torrentFile = new File(filePath);

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
                            ((AddTorrentAlert) alert).handle().resume();
                            break;
                        case BLOCK_FINISHED:
                            BlockFinishedAlert a = (BlockFinishedAlert) alert;
                            int p = (int) (a.handle().status().progress() * 100);
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

            TorrentInfo ti = new TorrentInfo(torrentFile);
            File destDir = new File("/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies");
            // s.download(ti, destDir);
            s.download("magnet:?xt=urn:btih:8CE082224BE3026057F0DB523725F6530939FF3E&dn=Scrat%3A+Spaced+Out+%282016%29+%5B720p%5D+%5BYTS.MX%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce", destDir);

            signal.await();

            s.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
