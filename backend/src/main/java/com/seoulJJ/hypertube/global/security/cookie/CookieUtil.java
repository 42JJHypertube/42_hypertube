package com.seoulJJ.hypertube.global.security.cookie;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Component;

import com.seoulJJ.hypertube.global.security.jwt.dto.JwtTokenDto;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
@RequiredArgsConstructor
public class CookieUtil {

	@Value("${info.web.domain}")
	private String domain;

	@Value("${spring.jwt.access-token-expiration}")
    private long accessTokenExpiresIn;
	
    @Value("${spring.jwt.refresh-token-expiration}")
    private long refreshTokenExpiresIn;

	public Optional<Cookie> getCookie(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();

		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (name.equals(cookie.getName())) {
					return Optional.of(cookie);
				}
			}
		}
		return Optional.empty();
	}

	public void addJwtTokenCookie(HttpServletResponse response, JwtTokenDto jwtTokenDto) {
		log.info("DOMAIN : " + domain);
		ResponseCookie accessTokenCookie = ResponseCookie.from("access_token", jwtTokenDto.getAccessToken())
			.maxAge((int)(refreshTokenExpiresIn / 1000))
			.domain(domain)
			.httpOnly(true)
			.path("/")
			.secure(true)
			.build();
		ResponseCookie refreshTokenCookie = ResponseCookie.from("refresh_token", jwtTokenDto.getRefreshToken())
			.maxAge((int)(refreshTokenExpiresIn / 1000))
			.domain(domain)
			.httpOnly(true)
			.path("/")
			.secure(true)
			.build();
		response.addHeader(HttpHeaders.SET_COOKIE, accessTokenCookie.toString());
		response.addHeader(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString());
	}

	public void addCookie(HttpServletResponse response, String name, String value, int maxAge) {

		ResponseCookie cookie = ResponseCookie.from(name, value)
			.maxAge(maxAge)
			.domain(domain)
			.httpOnly(true)
			.path("/")
			.secure(true)
			.build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
	}

	public void deleteCookie(HttpServletResponse response, String name) {
		ResponseCookie cookie = ResponseCookie.from(name, null)
			.maxAge(0)
			.domain(domain)
			.httpOnly(true)
			.path("/")
			.secure(true)
			.build();
		response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
	}

	public void deleteCookie(HttpServletRequest request, HttpServletResponse response, String name) {
		Cookie[] cookies = request.getCookies();

		if (cookies != null && cookies.length > 0) {
			for (Cookie cookie : cookies) {
				if (name.equals(cookie.getName())) {
					cookie.setValue("");
					cookie.setPath("/");
					cookie.setMaxAge(0);
					response.addCookie(cookie);
				}
			}
		}
	}
}

