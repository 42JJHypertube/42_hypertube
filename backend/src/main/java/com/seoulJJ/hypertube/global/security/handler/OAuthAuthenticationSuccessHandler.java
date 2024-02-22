package com.seoulJJ.hypertube.global.security.handler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seoulJJ.hypertube.global.security.jwt.JwtTokenProvider;
import com.seoulJJ.hypertube.global.security.jwt.dto.JwtTokenDto;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuthAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Value("${info.web.frontUrl}")
    private String targetUrl;

    // private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException {

        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        super.clearAuthenticationAttributes(request);
        this.determineTargetUrl(request, response, authentication);
        response.setHeader("X-Refresh-Token", "refreshToken");
        // getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {

        ObjectMapper objectMapper = new ObjectMapper();
        JwtTokenDto jwtToken = jwtTokenProvider.generateToken(authentication);
        try {
            String jsonResponse = objectMapper.writeValueAsString(jwtToken);
            response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + jwtToken.getAccessToken());
            response.setHeader("X-Refresh-Token", jwtToken.getRefreshToken());
            response.addCookie(new Cookie("jaehyuki", "is-good"));

            // // 응답의 컨텐츠 길이 설정
            // response.setContentLength(jsonResponse.getBytes("UTF-8").length);
            // // 출력 버퍼를 플러시하고 응답 작성
            // response.getWriter().write(jsonResponse);
            // response.getWriter().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }

        return targetUrl;
    }
}
