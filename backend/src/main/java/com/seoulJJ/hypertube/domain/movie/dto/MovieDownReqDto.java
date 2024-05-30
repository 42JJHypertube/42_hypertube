package com.seoulJJ.hypertube.domain.movie.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class MovieDownReqDto {
    @NotNull(message = "imdbId is required")
    private String imdbId;
    @NotNull(message = "magnetUrl is required")
    private String magnetUrl;
}
