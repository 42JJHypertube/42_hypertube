package com.seoulJJ.hypertube.global.security.auth.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.AuthenticationException;

public class AuthVerifyEmailTokenFailedException extends AuthenticationException{
     public AuthVerifyEmailTokenFailedException() {
        super("Invalid signup token", ErrorCode.UNAUTHORIZED);
    }
}
