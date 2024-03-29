package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

import lombok.Getter;

@Getter
public class CustomRuntimeException extends RuntimeException {
    private ErrorCode errorCode;

    public CustomRuntimeException(String message, ErrorCode errorCode) {
        super(message);
        this.errorCode = errorCode;
        errorCode.setMessage(message);
    }

    public CustomRuntimeException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
