package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class InvalidParameterException extends CustomRuntimeException{
    public InvalidParameterException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
