package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class DuplicationException extends CustomRuntimeException{
    public DuplicationException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
