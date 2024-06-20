package com.seoulJJ.hypertube.domain.movie.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.NotExistException;

public class MovieNotFoundException extends NotExistException{
    public MovieNotFoundException() {
        super("Movie not found", ErrorCode.MOVIE_NOT_FOUND);
    }    
}
