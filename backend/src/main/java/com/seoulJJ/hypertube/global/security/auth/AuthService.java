package com.seoulJJ.hypertube.global.security.auth;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.user.User;
import com.seoulJJ.hypertube.domain.user.UserService;
import com.seoulJJ.hypertube.domain.user.exception.UserNotFoundException;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthAccessTokenRequestDto;
import com.seoulJJ.hypertube.global.security.auth.exception.AuthVerifyCodeFailedException;
import com.seoulJJ.hypertube.global.security.auth.exception.AuthVerifyEmailTokenFailedException;
import com.seoulJJ.hypertube.global.security.jwt.JwtTokenProvider;
import com.seoulJJ.hypertube.global.security.jwt.RedisRefreshToken.RefreshTokenService;
import com.seoulJJ.hypertube.global.security.jwt.dto.JwtTokenDto;
import com.seoulJJ.hypertube.global.utils.RedisUtils;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final RedisUtils redis;

    @Autowired
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    private final RefreshTokenService refreshTokenService;

    @Autowired
    private final UserService userService;
    
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

    @Transactional
    public JwtTokenDto signInWithPassword(String email, String password) {
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

    @Transactional
    public JwtTokenDto signInWithEmailToken(String email, String emailToken) {

        if (!jwtTokenProvider.validateToken(emailToken)) {
            throw new AuthVerifyEmailTokenFailedException();
        }
        
        User user = userService.findUserByEmail(email);
        UserPrincipal userPrincipal = UserPrincipal.create(user);
        Authentication authentication = new UsernamePasswordAuthenticationToken(userPrincipal, null,
                userPrincipal.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return jwtTokenProvider.generateToken(authentication);
    }

    @Transactional
    public JwtTokenDto regenerateToken(AuthAccessTokenRequestDto accessTokenRequestDto) {
        
        String accessToken = accessTokenRequestDto.getAccessToken();
        String refreshToken = accessTokenRequestDto.getRefreshToken();
        String foundRefreshToken = refreshTokenService.findByAccesstoken(accessTokenRequestDto.getAccessToken())
                .getRefreshToken();

        if (!foundRefreshToken.equals(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        } else if (jwtTokenProvider.isExpired(refreshToken)) {
            throw new ExpiredJwtException(null, null, "Expired Refresh Token");
        } else if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new BadCredentialsException("Invalid refresh token");
        }

        refreshTokenService.removeRefreshToken(accessToken);
        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
        return jwtTokenProvider.generateToken(authentication);
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
