package com.seoulJJ.hypertube.domain.movie_subtitle;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie_subtitle.type.LanguageType;
import com.seoulJJ.hypertube.global.utils.BaseTimeEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Subtitle extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "language", nullable = false)
    private LanguageType language;

    @JoinColumn(name = "movie_id", nullable = false)
    @ManyToOne
    private Movie movie;

    public Subtitle(String path, LanguageType language, Movie movie) {
        this.path = path;
        this.language = language;
        this.movie = movie;
    }
}
