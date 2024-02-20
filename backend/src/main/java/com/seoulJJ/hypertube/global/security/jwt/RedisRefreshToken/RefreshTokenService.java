package com.seoulJJ.hypertube.global.security.jwt.RedisRefreshToken;

import org.springframework.stereotype.Service;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.security.auth.exception.AuthVerifyCodeFailedException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public void saveTokenInfo(Long userId, String refreshToken, String accessToken) {
        refreshTokenRepository.save(new RefreshToken(String.valueOf(userId), refreshToken, accessToken));
    }

    @Transactional
    public RefreshToken findByAccesstoken(String accessToken) {
        return refreshTokenRepository.findByAccessToken(accessToken).orElseThrow(() -> new AuthVerifyCodeFailedException());
    }

    @Transactional
    public void removeRefreshToken(String accessToken) {
        refreshTokenRepository.findByAccessToken(accessToken)
                .ifPresent(refreshToken -> refreshTokenRepository.delete(refreshToken));
    }
}
