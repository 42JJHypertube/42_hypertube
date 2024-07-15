package com.seoulJJ.hypertube.domain.movie.dto;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie.type.MovieState;

import lombok.Getter;

@Getter
public class MovieDto {

    private Long id;

    private String imdbId;

    private String torrentHash;

    private String hlsPlaylistPath;

    private MovieState movieState;

    static public MovieDto from(Movie movie) {
        MovieDto movieDto = new MovieDto();
        movieDto.id = movie.getId();
        movieDto.imdbId = movie.getImdbId();
        movieDto.torrentHash = movie.getTorrentHash();
        movieDto.movieState = movie.getMovieState();
        movieDto.hlsPlaylistPath = movie.getHlsPlaylistPath();
        return movieDto;
    }

    @Override
    public String toString() {
        return "MovieDto [hlsPlaylistPath=" + hlsPlaylistPath + ", id=" + id + ", imdbId=" + imdbId + ", movieState="
                + movieState + ", torrentHash=" + torrentHash + "]";
    }
}
