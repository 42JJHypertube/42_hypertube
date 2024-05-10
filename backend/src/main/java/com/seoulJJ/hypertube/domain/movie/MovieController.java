package com.seoulJJ.hypertube.domain.movie;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent.JlibtorrentDownloader;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private final JlibtorrentDownloader jlibtorrentDownloader;

    @PostMapping("/torrent/download")
    public String startDownloadTorrent(String magnetUrl, String imdbId) throws Throwable {
        MovieDownDto movieDownDto = new MovieDownDto(magnetUrl, imdbId);
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(() -> {
            try {
                jlibtorrentDownloader.startDownloadWithMagnet(movieDownDto);
            } catch (Throwable throwable) {
                throwable.printStackTrace();
            }
        });
        executor.shutdown();
        return "Torrent download Started! => torrentHash: " + movieDownDto.getTorrentHash();
    }
}
