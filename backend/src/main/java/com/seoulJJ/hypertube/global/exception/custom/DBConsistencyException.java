package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

import lombok.Getter;

@Getter
public class DBConsistencyException extends CustomRuntimeException {
    public DBConsistencyException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
}
