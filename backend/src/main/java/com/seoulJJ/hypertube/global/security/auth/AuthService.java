package com.seoulJJ.hypertube.global.security.auth;

import java.util.Random;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.user.exception.UserVerifySignupTokenFailedException;
import com.seoulJJ.hypertube.global.security.auth.exception.AuthVerifyCodeFailedException;
import com.seoulJJ.hypertube.global.security.jwt.JwtTokenProvider;
import com.seoulJJ.hypertube.global.security.jwt.dto.JwtTokenDto;
import com.seoulJJ.hypertube.global.utils.RedisUtils;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class AuthService {

    private final RedisUtils redis;

    @Autowired
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

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

    @Transactional
    public JwtTokenDto signIn(String email, String password) {
        // 1. username + password 를 기반으로 Authentication 객체 생성
        // 이때 authentication 은 인증 여부를 확인하는 authenticated 값이 false
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,
                password);

        // 2. 실제 검증. authenticate() 메서드를 통해 요청된 Member 에 대한 검증 진행
        // authenticate 메서드가 실행될 때 CustomUserDetailsService 에서 만든 loadUserByUsername 메서드
        // 실행
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // // 3. 인증 정보를 기반으로 JWT 토큰 생성
        JwtTokenDto jwtToken = jwtTokenProvider.generateToken(authentication);

        return jwtToken;
    }
}
