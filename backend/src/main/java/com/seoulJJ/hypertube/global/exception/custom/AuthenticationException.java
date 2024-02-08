package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class AuthenticationException extends CustomRuntimeException {
    public AuthenticationException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
