package com.seoulJJ.hypertube.global.security.auth.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.AuthenticationException;

public class AuthInvalidTokenException extends AuthenticationException{
        public AuthInvalidTokenException() {
        super("Invalid Token ", ErrorCode.INVALID_JWT);
    }
}
