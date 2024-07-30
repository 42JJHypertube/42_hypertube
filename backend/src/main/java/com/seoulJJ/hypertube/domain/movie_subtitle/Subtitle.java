package com.seoulJJ.hypertube.domain.movie_subtitle;

import com.seoulJJ.hypertube.domain.movie.Movie;
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

    @Column(name = "open_subtitle_id", nullable = false)
    private Long openSubtitleId;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "language", nullable = false)
    private String language;

    @JoinColumn(name = "movie_id", nullable = false)
    @ManyToOne
    private Movie movie;

    public Subtitle(Long openSubtitleId, String path, String language, Movie movie) {
        this.openSubtitleId = openSubtitleId;
        this.path = path;
        this.language = language;
        this.movie = movie;
    }

    public String toString() {
        return "id: " + id + ", openSubtitleId: " + openSubtitleId + ", path: " + path + ", language: " + language
                + ", movie: " + movie.toString();
    }
}
