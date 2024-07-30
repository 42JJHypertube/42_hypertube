package com.seoulJJ.hypertube.domain.movie_comment.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class CreateCommentReqDto {
    @NotNull(message = "content는 null일 수 없습니다.")
    private String content;

    public String toString() {
        return "CreateCommentReqDto(content=" + this.getContent() + ")";
    }
}
