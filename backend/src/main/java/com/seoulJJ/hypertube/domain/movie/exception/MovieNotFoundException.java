package com.seoulJJ.hypertube.domain.movie.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.NotExistException;

public class MovieNotFoundException extends NotExistException{
    public MovieNotFoundException(String message) {
        super(message, ErrorCode.MOVIE_NOT_FOUND);
    }    
}
