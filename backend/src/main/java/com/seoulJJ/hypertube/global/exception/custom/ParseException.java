package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class ParseException extends CustomRuntimeException {
    public ParseException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
