package com.seoulJJ.hypertube.global.security.auth.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AuthSignInDto {
    private String email;
    private String password;
}
