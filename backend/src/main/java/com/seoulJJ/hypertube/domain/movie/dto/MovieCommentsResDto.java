package com.seoulJJ.hypertube.domain.movie.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

import com.seoulJJ.hypertube.domain.movie_comment.dto.CommentDto;

@Getter
@AllArgsConstructor
public class MovieCommentsResDto {
    List<CommentDto> comments;

    public String toString() {
        return "MovieCommentsResDto{" +
                "comments=" + comments +
                '}';
    }
}
