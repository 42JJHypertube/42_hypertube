package com.seoulJJ.hypertube.domain.movie.comment.dto;

import com.seoulJJ.hypertube.domain.movie.comment.Comment;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDto;
import com.seoulJJ.hypertube.domain.user.dto.UserDto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@AllArgsConstructor
public class CommentDto {

    private Long id;

    private MovieDto movie;

    private UserDto user;

    private String content;

    static public CommentDto from(Comment comment) {
        CommentDto commentDto = new CommentDto(comment.getId(), MovieDto.from(comment.getMovie()),
                UserDto.from(comment.getUser()), comment.getContent());
        return commentDto;
    }
}
