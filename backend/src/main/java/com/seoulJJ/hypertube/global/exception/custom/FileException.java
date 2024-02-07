package com.seoulJJ.hypertube.global.exception.custom;

import com.seoulJJ.hypertube.global.exception.ErrorCode;

public class FileException  extends CustomRuntimeException{

    public FileException(String message, ErrorCode errorCode) {
            super(message, errorCode);
        }
}
