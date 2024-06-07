package com.seoulJJ.hypertube.domain.movie.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie.MovieRepository;
import com.seoulJJ.hypertube.domain.movie.comment.dto.CommentDto;
import com.seoulJJ.hypertube.domain.movie.comment.exception.CommentForbiddenException;
import com.seoulJJ.hypertube.domain.movie.comment.exception.CommentNotFoundException;
import com.seoulJJ.hypertube.domain.user.User;
import com.seoulJJ.hypertube.domain.user.UserRepository;
import com.seoulJJ.hypertube.global.security.UserPrincipal;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MovieRepository movieRepository;

    @Transactional(readOnly = true)
    public List<CommentDto> findCommentsByMovieId(Long movieId) {
        List<Comment> comments = commentRepository.findByMovieId(movieId);
        return comments.stream().map(CommentDto::from).collect(Collectors.toList());
    }

    @Transactional
    public void createComment(Long userId, Long movieId, String content) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Movie movie = movieRepository.findById(movieId)
                .orElseThrow(() -> new IllegalArgumentException("Movie not found"));
        Comment comment = new Comment(movie, user, content);
        commentRepository.save(comment);
    }

    @Transactional
    public void deleteComment(UserPrincipal userPrincipal, Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new CommentNotFoundException());
        if (comment.getUser().getId() != userPrincipal.getId()) {
            throw new CommentForbiddenException("You are not the author of this comment");
        }
        commentRepository.deleteById(commentId);
    }

    @Transactional
    public void updateComment(UserPrincipal userPrincipal, Long commentId, String content) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(() -> new CommentNotFoundException());
        if (comment.getUser().getId() != userPrincipal.getId()) {
            throw new CommentForbiddenException("You are not the author of this comment");
        }
        comment.updateContent(content);
        commentRepository.save(comment);
    }
}
