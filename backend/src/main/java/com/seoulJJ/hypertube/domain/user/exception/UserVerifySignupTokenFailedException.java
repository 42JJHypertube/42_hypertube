package com.seoulJJ.hypertube.domain.user.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.AuthenticationException;

public class UserVerifySignupTokenFailedException extends AuthenticationException{
     public UserVerifySignupTokenFailedException() {
        super("Invalid signup token", ErrorCode.UNAUTHORIZED);
    }
}
