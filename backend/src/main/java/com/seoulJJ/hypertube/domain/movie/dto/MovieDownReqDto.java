package com.seoulJJ.hypertube.domain.movie.dto;

import lombok.Getter;

@Getter
public class MovieDownReqDto {
    private String imdbId;
    private String magnetUrl;
}
