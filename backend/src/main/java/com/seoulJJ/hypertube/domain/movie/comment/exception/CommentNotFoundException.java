package com.seoulJJ.hypertube.domain.movie.comment.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.NotExistException;

public class CommentNotFoundException extends NotExistException {
    public CommentNotFoundException() {
        super("Comment not found", ErrorCode.COMMENT_NOT_FOUND);
    }
}
