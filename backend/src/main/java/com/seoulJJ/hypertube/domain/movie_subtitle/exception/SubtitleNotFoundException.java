package com.seoulJJ.hypertube.domain.movie_subtitle.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.NotExistException;

public class SubtitleNotFoundException extends NotExistException {
    public SubtitleNotFoundException() {
        super("Subtitle not found", ErrorCode.SUBTITLE_NOT_FOUND);
    }
}
