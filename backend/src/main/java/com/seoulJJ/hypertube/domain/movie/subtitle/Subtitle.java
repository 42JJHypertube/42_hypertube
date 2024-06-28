package com.seoulJJ.hypertube.domain.movie.subtitle;

import com.seoulJJ.hypertube.domain.movie.Movie;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Subtitle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "path", nullable = false)
    private String path;

    @Column(name = "language", nullable = false)

    @JoinColumn(name = "movie_id", nullable = false)
    @ManyToOne
    private Movie movie;
}
