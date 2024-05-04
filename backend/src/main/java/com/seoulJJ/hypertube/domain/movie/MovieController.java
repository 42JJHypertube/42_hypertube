package com.seoulJJ.hypertube.domain.movie;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent.JlibtorrentDownloader;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private final JlibtorrentDownloader jlibtorrentDownloader;

    @PostMapping("/torrent/download")
    public String startDownloadTorrent(@RequestBody String entity) throws Throwable {
        String magnetLink = "magnet:?xt=urn:btih:8CE082224BE3026057F0DB523725F6530939FF3E&dn=Scrat%3A+Spaced+Out+%282016%29+%5B720p%5D+%5BYTS.MX%5Ds&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce";
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(() -> {
            try {
                jlibtorrentDownloader.startDownloadWithMagnet(magnetLink);
            } catch (Throwable throwable) {
                throwable.printStackTrace();
            }
        });
        executor.shutdown();
        return "Torrent download Started! => torrentHash: 8CE082224BE3026057F0DB523725F6530939FF3E";
    }
}
