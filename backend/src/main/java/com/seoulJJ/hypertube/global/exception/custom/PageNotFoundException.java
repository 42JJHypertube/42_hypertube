package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class PageNotFoundException extends CustomRuntimeException{
    public PageNotFoundException(String message, ErrorCode errorCode) {
        super(message, errorCode);
    }
    public PageNotFoundException() {
        super(ErrorCode.PAGE_NOT_FOUND.getMessage(), ErrorCode.PAGE_NOT_FOUND);
    }
}
