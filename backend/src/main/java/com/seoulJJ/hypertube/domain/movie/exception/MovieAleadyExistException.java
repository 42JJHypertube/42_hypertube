package com.seoulJJ.hypertube.domain.movie.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.DuplicationException;

public class MovieAleadyExistException extends DuplicationException{
    public MovieAleadyExistException(String message) {
        super(message, ErrorCode.MOVIE_ALREADY_EXIST);
    }
}
