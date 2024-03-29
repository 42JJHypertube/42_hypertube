package com.seoulJJ.hypertube.global.security.jwt;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import com.seoulJJ.hypertube.global.security.auth.exception.AuthInvalidTokenException;
import com.seoulJJ.hypertube.global.security.cookie.CookieUtil;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        // 1. Request Header에서 JWT 토큰 추출
        String token = resolveToken((HttpServletRequest) request);

        if (((HttpServletRequest) request).getServletPath().equals("/api/auth/access-token")) {
            chain.doFilter(request, response);
            return;
        }

        // 2. validateToken으로 토큰 유효성 검사
        if (token != null) {
            if (jwtTokenProvider.validateToken(token)) {
                // 3-1. 토큰이 유효할 경우 토큰에서 Authentication 객체를 가지고 와서 SecurityContext에 저장
                Authentication authentication = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } else {
                // 3-2. 토큰이 유효하지 않을 경우
                throw new AuthInvalidTokenException();
            }
        }

        chain.doFilter(request, response);
    }

    // Request에서 토큰 정보 추출
    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer")) {
            return bearerToken.substring(7);
        }

        CookieUtil cookieUtil = new CookieUtil();
        if (cookieUtil.getCookie(request, "access_token").isPresent()) {
            Cookie cookie = cookieUtil.getCookie(request, "access_token").get();
            return cookie.getValue();
        }
        return null;
    }
}
