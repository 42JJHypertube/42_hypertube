package com.seoulJJ.hypertube.domain.user.dto;

import java.util.List;

import com.seoulJJ.hypertube.domain.movie.dto.MovieDto;

import lombok.Getter;

@Getter
public class RecentWatchedMoviesResDto {

    List<MovieDto> movies;

    public RecentWatchedMoviesResDto(List<MovieDto> movies) {
        this.movies = movies;
    }
}
