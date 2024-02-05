package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class SendException extends CustomRuntimeException {
    public SendException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
