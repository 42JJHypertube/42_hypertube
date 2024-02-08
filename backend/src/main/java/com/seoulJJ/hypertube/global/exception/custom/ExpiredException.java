package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class ExpiredException extends CustomRuntimeException{
    public ExpiredException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
