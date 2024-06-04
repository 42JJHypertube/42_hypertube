package com.seoulJJ.hypertube.domain.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie.dto.MovieDownDto;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDownReqDto;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDto;
import com.seoulJJ.hypertube.domain.movie.exception.MovieNotFoundException;
import com.seoulJJ.hypertube.domain.user.UserService;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.utils.argumentresolver.LoginPrincipal;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private final MovieService movieService;

    @Autowired
    private final UserService userService;

    @GetMapping("/info")
    public ResponseEntity<?> getMovieInfo(@Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal,
            @RequestParam(required = true) String imdbId) {
        try {
            MovieDto movieDto = movieService.findMovieByImdbId(imdbId);
            userService.updateRecentWatchedMovies(userPrincipal, movieDto);

            return ResponseEntity.ok(movieDto);
        } catch (MovieNotFoundException e) {
            return ResponseEntity.noContent().build();
        }
    }

    @PostMapping("/torrent/download")
    public String startDownloadTorrent(@RequestBody MovieDownReqDto reqDto) throws Throwable {
        MovieDownDto movieDownDto = new MovieDownDto(reqDto.getMagnetUrl(), reqDto.getImdbId());
        movieService.downLoadMovie(movieDownDto);
        return movieDownDto.getTorrentHash();
    }
}
