package com.seoulJJ.hypertube.domain.movie.comment.dto;

import lombok.Getter;

@Getter
public class CreateCommentReqDto {
    private Long movieId;
    private String content;

    public String toString() {
        return "CreateCommentReqDto{" +
                "movieId=" + movieId +
                ", content='" + content + '\'' +
                '}';
    }
}
