package com.seoulJJ.hypertube.domain.movie;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.swing.text.html.Option;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.movie.dto.MovieDownDto;
import com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent.JlibtorrentDownloader;
import com.seoulJJ.hypertube.domain.movie.type.MovieState;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    public static final List<String> downloadingTorrentHash = new ArrayList<>();

    @Autowired
    private final JlibtorrentDownloader jlibtorrentDownloader;

    @Autowired
    private final MovieRepository movieRepository;

    @Transactional
    public void downLoadMovie(MovieDownDto movieDownDto) {
        Movie movie;
        Optional<Movie> movieOpt = movieRepository.findByImdbId(movieDownDto.getImdbId());
        if (movieOpt.isPresent()) {
            movie = movieOpt.get();
            if (movieOpt.get().getMovieState() == MovieState.AVAILABLE
                    || downloadingTorrentHash.contains(movie.getImdbId())) {
                    return;
            }
        } else {
            movie = new Movie(movieDownDto);
            movieRepository.saveAndFlush(movie);
        }

        downloadingTorrentHash.add(movieDownDto.getImdbId());
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(() -> {
            try {
                jlibtorrentDownloader.startDownloadWithMagnet(movieDownDto);
            } catch (Throwable throwable) {
                // TODO: handle exception
            }
        });
        executor.shutdown();
    }
}
