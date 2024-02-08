package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class NotExistException extends CustomRuntimeException {

    public NotExistException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
