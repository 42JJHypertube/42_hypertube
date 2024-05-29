package com.seoulJJ.hypertube.domain.movie;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie.dto.MovieDownDto;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDownReqDto;
import com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent.JlibtorrentDownloader;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private final MovieService movieService;

    @PostMapping("/torrent/download")
    public String startDownloadTorrent(@RequestBody MovieDownReqDto reqDto) throws Throwable {
        MovieDownDto movieDownDto = new MovieDownDto(reqDto.getMagnetUrl(), reqDto.getImdbId());
        movieService.downLoadMovie(movieDownDto);
        return movieDownDto.getTorrentHash();
    }
}
