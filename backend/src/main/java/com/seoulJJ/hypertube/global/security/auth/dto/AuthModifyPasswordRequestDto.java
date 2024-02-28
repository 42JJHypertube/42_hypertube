package com.seoulJJ.hypertube.global.security.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class AuthModifyPasswordRequestDto {
    @NotNull
    private String password;

    @NotNull
    private String password2;

    @NotNull
    private String emailToken;
}
