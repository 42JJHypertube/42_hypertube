package com.seoulJJ.hypertube.domain.movie_comment.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.ForbiddenException;

public class CommentForbiddenException extends ForbiddenException {
    public CommentForbiddenException(String message) {
        super(message, ErrorCode.COMMENT_FORBIDDEN);
    }
}