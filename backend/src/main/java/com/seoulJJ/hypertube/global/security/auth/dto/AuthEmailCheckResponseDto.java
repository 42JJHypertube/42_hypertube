package com.seoulJJ.hypertube.global.security.auth.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class AuthEmailCheckResponseDto {
    private boolean isEmailExist;
    private boolean isPasswordExist;
}
