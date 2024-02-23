package com.seoulJJ.hypertube.global.security.handler;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.seoulJJ.hypertube.global.security.cookie.CookieUtil;
import com.seoulJJ.hypertube.global.security.jwt.JwtTokenProvider;
import com.seoulJJ.hypertube.global.security.jwt.dto.JwtTokenDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuthAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Value("${info.web.frontUrl}")
    private String targetUrl;
    @Value("${spring.jwt.access-token-expiration}")
    private long accessTokenExpiresIn;
    @Value("${spring.jwt.refresh-token-expiration}")
    private long refreshTokenExpiresIn;

    private final JwtTokenProvider jwtTokenProvider;

    private final CookieUtil cookieUtil;

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
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    @Override
    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) {
        JwtTokenDto jwtToken = jwtTokenProvider.generateToken(authentication);
        cookieUtil.addCookie(response, "access_token", jwtToken.getAccessToken(), (int)(accessTokenExpiresIn / 1000));
        cookieUtil.addCookie(response, "refresh_token", jwtToken.getRefreshToken(), (int)(refreshTokenExpiresIn / 1000));

        return targetUrl;
    }
}
