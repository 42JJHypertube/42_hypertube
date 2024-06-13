package com.seoulJJ.hypertube.domain.movie;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.movie.dto.MovieDownDto;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDto;
import com.seoulJJ.hypertube.domain.movie.exception.MovieNotFoundException;
import com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent.JlibtorrentDownloader;
import com.seoulJJ.hypertube.domain.movie.type.MovieState;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieService {

    public static final List<String> downloadingMovies = new ArrayList<>();

    @Autowired
    private final JlibtorrentDownloader jlibtorrentDownloader;

    @Autowired
    private final MovieRepository movieRepository;

    public MovieDto downloadMovie(MovieDownDto movieDownDto) {
        Movie movie;
        Optional<Movie> movieOpt = movieRepository.findByImdbId(movieDownDto.getImdbId());
        if (movieOpt.isPresent()) {
            movie = movieOpt.get();
            if (movieOpt.get().getMovieState() == MovieState.AVAILABLE
                    || downloadingMovies.contains(movie.getImdbId())) {
                System.out.println("DownLoading Movies => " + downloadingMovies);
                return MovieDto.from(movie);
            }
        } else {
            try {
                movie = new Movie(movieDownDto);
                movieRepository.saveAndFlush(movie);
            } catch (Exception e) {
                throw new MovieNotFoundException();
            }
        }

        downloadingMovies.add(movieDownDto.getImdbId());
        System.out.println("DownLoading Movies => " + downloadingMovies);
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(() -> {
            try {
                jlibtorrentDownloader.startDownloadWithMagnet(movieDownDto);
            } catch (Throwable throwable) {
                // TODO: handle exception
            }
        });
        executor.shutdown();
        return MovieDto.from(movie);

    }

    @Transactional(readOnly = true)
    public MovieDto findMovieByImdbId(String imdbId) {
        Movie movie = movieRepository.findByImdbId(imdbId)
                .orElseThrow(() -> new MovieNotFoundException());
        return MovieDto.from(movie);
    }
}
