package com.seoulJJ.hypertube.global.exception.custom;

import lombok.Getter;

@Getter
public class OpenSubtitleAPIException extends RuntimeException {
    private Integer errorCode;

    public OpenSubtitleAPIException(String message, Integer errorCode) {
        super(message);
        this.errorCode = errorCode;
    }
}
