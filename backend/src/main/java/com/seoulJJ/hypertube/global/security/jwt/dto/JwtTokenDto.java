package com.seoulJJ.hypertube.global.security.jwt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtTokenDto {
    private String grantType;
    private String accessToken;
    private String refreshToken;

    public String toString() {
        return "JwtTokenDto{" +
                "grantType='" + grantType + '\'' +
                ", accessToken='" + accessToken + '\'' +
                ", refreshToken='" + refreshToken + '\'' +
                '}';
    }
}
