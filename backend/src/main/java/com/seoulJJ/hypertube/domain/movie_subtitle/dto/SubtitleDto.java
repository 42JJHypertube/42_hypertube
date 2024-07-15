package com.seoulJJ.hypertube.domain.movie_subtitle.dto;

import com.seoulJJ.hypertube.domain.movie_subtitle.Subtitle;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SubtitleDto {

    private Long openSubtitleId;

    private Long movieId;

    private String path;

    private String language;

    public SubtitleDto(Long openSubtitleId, Long movieId, String path, String language) {
        this.movieId = movieId;
        this.path = path;
        this.language = language;
    }

    public SubtitleDto(Subtitle subtitle) {
        this.openSubtitleId = subtitle.getOpenSubtitleId();
        this.movieId = subtitle.getMovie().getId();
        this.path = subtitle.getPath();
        this.language = subtitle.getLanguage();
    }

    public static SubtitleDto from(Subtitle subtitle) {
        return new SubtitleDto(subtitle);
    }

    public String toString() {
        return "openSubtitleId: " + openSubtitleId + ", movieId: " + movieId + ", path: " + path + ", language: "
                + language;
    }
}
