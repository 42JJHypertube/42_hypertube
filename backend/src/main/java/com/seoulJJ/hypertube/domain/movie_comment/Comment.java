package com.seoulJJ.hypertube.domain.movie_comment;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.user.User;
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
public class Comment extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "movie_id", nullable = false)
    @ManyToOne
    private Movie movie;

    @JoinColumn(name = "user_id", nullable = false, unique = false)
    @ManyToOne
    private User user;

    @Column(name = "content", nullable = false)
    private String content;

    public Comment(Movie movie, User user, String content) {
        this.movie = movie;
        this.user = user;
        this.content = content;
    }

    public void updateContent(String content) {
        this.content = content;
    }
}
