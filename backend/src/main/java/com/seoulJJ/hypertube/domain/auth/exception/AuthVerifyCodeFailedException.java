package com.seoulJJ.hypertube.domain.auth.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.AuthenticationException;

public class AuthVerifyCodeFailedException extends AuthenticationException {
    public AuthVerifyCodeFailedException() {
        super("Invalid verification code", ErrorCode.UNAUTHORIZED);
    }
}
