package com.seoulJJ.hypertube.domain.movie.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie.type.MovieState;
import com.seoulJJ.hypertube.domain.movie_subtitle.dto.SubtitleDto;

import lombok.Getter;

@Getter
public class MovieDto {

    private Long id;

    private String imdbId;

    private String torrentHash;

    private String hlsPlaylistPath;

    private MovieState movieState;

    private List<SubtitleDto> subtitles;

    static public MovieDto from(Movie movie) {
        MovieDto movieDto = new MovieDto();
        movieDto.id = movie.getId();
        movieDto.imdbId = movie.getImdbId();
        movieDto.torrentHash = movie.getTorrentHash();
        movieDto.movieState = movie.getMovieState();
        movieDto.hlsPlaylistPath = movie.getHlsPlaylistPath();
        movieDto.subtitles = movie.getSubtitleList().stream().map(SubtitleDto::new).collect(Collectors.toList());
        return movieDto;
    }

    @Override
    public String toString() {
        return "MovieDto [hlsPlaylistPath=" + hlsPlaylistPath + ", id=" + id + ", imdbId=" + imdbId + ", movieState="
                + movieState + ", torrentHash=" + torrentHash + "]";
    }
}
