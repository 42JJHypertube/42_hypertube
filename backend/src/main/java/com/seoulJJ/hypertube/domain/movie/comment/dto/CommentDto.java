package com.seoulJJ.hypertube.domain.movie.comment.dto;

import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

import com.seoulJJ.hypertube.domain.movie.comment.Comment;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDto;
import com.seoulJJ.hypertube.domain.user.dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommentDto {

    private Long id;

    private MovieDto movie;

    private UserDto user;

    private String content;

    private LocalDateTime commentedAt;

    static public CommentDto from(Comment comment) {
        LocalDateTime commentedAt = comment.getModifiedAt();
        if (commentedAt == null) {
            commentedAt = comment.getCreatedAt();
        }
        CommentDto commentDto = new CommentDto(comment.getId(), MovieDto.from(comment.getMovie()),
                UserDto.from(comment.getUser()), comment.getContent(), commentedAt);
        return commentDto;
    }
}
