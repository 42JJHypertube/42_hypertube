package com.seoulJJ.hypertube.global.security.auth.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.AuthenticationException;

public class AuthTokenCookieNotFoundException extends AuthenticationException {
    public AuthTokenCookieNotFoundException() {
        super("Can't find accessToken or refreshToken", ErrorCode.NO_COOKIE);
    }
}
