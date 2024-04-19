package com.seoulJJ.hypertube.global.security.jwt;

import java.io.IOException;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.ErrorResponse;
import com.seoulJJ.hypertube.global.security.auth.exception.AuthInvalidTokenException;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class ExceptionHandlerFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            chain.doFilter(request, response);
        } catch (ExpiredJwtException e) {
            // 토큰의 유효기간 만료
            setErrorResponse((HttpServletResponse) response, ErrorCode.EXPIRED_JWT);
        } catch (AuthInvalidTokenException e) {
            // 토큰이 유효하지 않음
            setErrorResponse((HttpServletResponse) response, ErrorCode.INVALID_JWT);
        }
    }

    private void setErrorResponse(
            HttpServletResponse response,
            ErrorCode errorCode) {
        ObjectMapper objectMapper = new ObjectMapper();
        response.setStatus(errorCode.getStatus());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        ErrorResponse errorResponse = new ErrorResponse(errorCode);
        try {
            String jsonResponse = objectMapper.writeValueAsString(errorResponse);

            // 응답의 컨텐츠 길이 설정
            response.setContentLength(jsonResponse.getBytes("UTF-8").length);
            // 출력 버퍼를 플러시하고 응답 작성
            response.getWriter().write(jsonResponse);
            response.getWriter().flush();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}