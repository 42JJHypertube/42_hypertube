package com.seoulJJ.hypertube.global.security.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class AuthAccessTokenRequestDto {
    @NotNull(message = "accessToken은 필수 값입니다.")
    private String accessToken;

    @NotNull(message = "refreshToken은 필수 값입니다.")
    private String refreshToken;
}
