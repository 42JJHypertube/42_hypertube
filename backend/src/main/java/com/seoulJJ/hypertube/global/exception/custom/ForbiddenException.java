package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class ForbiddenException extends CustomRuntimeException{
    public ForbiddenException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
