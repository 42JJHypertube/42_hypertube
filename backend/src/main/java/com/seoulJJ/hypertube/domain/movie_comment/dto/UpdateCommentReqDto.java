package com.seoulJJ.hypertube.domain.movie_comment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UpdateCommentReqDto {
    @NotNull
    private String content;

    public String toString() {
        return "UpdateCommentReqDto(content=" + this.getContent() + ")";
    }
}
