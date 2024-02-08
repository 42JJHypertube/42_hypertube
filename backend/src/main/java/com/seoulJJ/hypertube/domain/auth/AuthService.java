package com.seoulJJ.hypertube.domain.auth;

import java.util.Random;
import java.util.UUID;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;

import com.seoulJJ.hypertube.domain.auth.exception.AuthVerifyCodeFailedException;
import com.seoulJJ.hypertube.domain.user.exception.UserVerifySignupTokenFailedException;
import com.seoulJJ.hypertube.global.utils.RedisUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Service
@RequiredArgsConstructor

public class AuthService {

    private final RedisUtils redis;

    public String createCode(@NonNull String email) {
        String code = generateCode();
        redis.setData(email, code, 300000L);
        return code;
    }

    public void verifyCode(@NonNull String email, @NonNull String code) {
        if (!code.equals(redis.getData(email))) {
            throw new AuthVerifyCodeFailedException();
        }
    }

    public String generateSignupToken(@NonNull String email) {
        String token = UUID.randomUUID().toString();
        redis.setData(token, email, 600000L);
        return token;
    }
    
    public void verifySignupToken(@NonNull String token, @NonNull String email) {
        if (!email.equals(redis.getData(token))) {
            throw new UserVerifySignupTokenFailedException();
        }
    }

    private String generateCode() {
        String characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder code = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < 6; i++) {
            int index = random.nextInt(characters.length());
            code.append(characters.charAt(index));
        }

        return code.toString();
    }
}
