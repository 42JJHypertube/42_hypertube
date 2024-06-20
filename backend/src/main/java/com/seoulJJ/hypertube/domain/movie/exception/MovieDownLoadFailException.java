package com.seoulJJ.hypertube.domain.movie.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.CustomRuntimeException;

public class MovieDownLoadFailException extends CustomRuntimeException {
    public MovieDownLoadFailException(String message) {
        super(message, ErrorCode.MOVIE_DOWNLOAD_FAIL);
    }
}
