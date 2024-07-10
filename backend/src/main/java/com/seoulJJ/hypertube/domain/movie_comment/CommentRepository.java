package com.seoulJJ.hypertube.domain.movie_comment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByMovieId(Long movieId);

    List<Comment> findByMovieIdOrderByModifiedAtDesc(Long movieId);
}
