package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class FFmpegException extends CustomRuntimeException{
    public FFmpegException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
