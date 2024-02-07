package com.seoulJJ.hypertube.domain.auth.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access =  AccessLevel.PROTECTED)
public class AuthSendCodeRequestDto {
    
    @NotNull(message = "email은 필수 값입니다.")
    private String email;
}
