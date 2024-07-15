package com.seoulJJ.hypertube.domain.movie_subtitle.dto;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie_subtitle.Subtitle;
import com.seoulJJ.hypertube.domain.movie_subtitle.type.LanguageType;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public class SubtitleDto {

    private Long id;

    private Long movieId;

    private String path;

    private LanguageType language;

    public SubtitleDto(Long id, Long movieId, String path, LanguageType language) {
        this.id = id;
        this.movieId = movieId;
        this.path = path;
        this.language = language;
    }

    public SubtitleDto(Subtitle subtitle) {
        this.id = subtitle.getId();
        this.movieId = subtitle.getMovie().getId();
        this.path = subtitle.getPath();
        this.language = subtitle.getLanguage();
    }

    public static SubtitleDto from(Subtitle subtitle) {
        return new SubtitleDto(subtitle);
    }

    public String toString() {
        return "SubtitleDto(id=" + this.getId() + ", movie_id=" + this.getMovieId() + ", path=" + this.getPath()
                + ", language=" + this.getLanguage() + ")";
    }
}
