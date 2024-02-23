package com.seoulJJ.hypertube.domain.user.exception;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.NotExistException;

public class UserNotFoundException extends NotExistException {
	public UserNotFoundException() {
		super("해당 유저가 없습니다.", ErrorCode.USER_NOT_FOUND);
	}
}
