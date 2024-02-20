package com.seoulJJ.hypertube.global.exception;

import java.util.ArrayList;
import java.util.List;

import org.springframework.boot.context.properties.bind.BindException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.seoulJJ.hypertube.global.exception.custom.AuthenticationException;
import com.seoulJJ.hypertube.global.exception.custom.CustomRuntimeException;
import com.seoulJJ.hypertube.global.exception.custom.DuplicationException;
import com.seoulJJ.hypertube.global.exception.custom.ForbiddenException;
import com.seoulJJ.hypertube.global.exception.custom.NotExistException;
import com.seoulJJ.hypertube.global.exception.custom.PageNotFoundException;

import io.jsonwebtoken.ExpiredJwtException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({ BindException.class })
    public ResponseEntity<ErrorResponse> validException(BindException ex) {
        log.error("bind error", ex.getMessage());
        ErrorCode ec = ErrorCode.VALID_FAILED;
        ec.setMessage(ex.getMessage());
        ErrorResponse response = new ErrorResponse(ec);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ MethodArgumentTypeMismatchException.class })
    public ResponseEntity<ErrorResponse> typeErrorException(MethodArgumentTypeMismatchException ex) {
        log.error("type error", ex.getMessage());
        ErrorCode ec = ErrorCode.VALID_FAILED;
        ec.setMessage(ex.getMessage());
        ErrorResponse response = new ErrorResponse(ec);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ MethodArgumentNotValidException.class })
    public ResponseEntity<ErrorResponse> validException(MethodArgumentNotValidException ex) {
        log.error("valid error", ex.getMessage());
        BindingResult bindingResult = ex.getBindingResult();
        List<FieldError> fieldErrors = bindingResult.getFieldErrors();

        List<String> errorMessages = new ArrayList<>();
        for (FieldError fieldError : fieldErrors) {
            errorMessages.add(fieldError.getDefaultMessage());
        }

        ErrorCode ec = ErrorCode.VALID_FAILED;
        ec.setMessage(errorMessages.toString());
        ErrorResponse response = new ErrorResponse(ec);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ NotExistException.class, PageNotFoundException.class })
    public ResponseEntity<ErrorResponse> notFoundException(CustomRuntimeException ex) {
        log.error("Not Exist", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({ DuplicationException.class })
    public ResponseEntity<ErrorResponse> duplicatedException(DuplicationException ex) {
        log.error("Duplicated", ex);
        return new ResponseEntity<>(new ErrorResponse(ex.getErrorCode()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler({ ForbiddenException.class })
    public ResponseEntity<ErrorResponse> forbiddenException(ForbiddenException ex) {
        log.error("forbidden", ex);
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({ CustomRuntimeException.class })
    public ResponseEntity<ErrorResponse> validException(CustomRuntimeException ex) {
        log.error("예외처리된 에러", ex.getMessage(), ex.getErrorCode());
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorResponse> authenticationException(AuthenticationException ex) {
        log.error("authentication exception");
        ErrorResponse response = new ErrorResponse(ex.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<ErrorResponse> expiredJwtException(ExpiredJwtException ex) {
        log.error("expired jwt exception");
        ErrorResponse response = new ErrorResponse(ErrorCode.EXPIRED_JWT);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler({ RuntimeException.class })
    public ResponseEntity<ErrorResponse> runtimeException(RuntimeException ex) {
        log.error("처리되지 않은 에러입니다.", ex);
        ErrorResponse response = new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERR);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ResponseEntity<ErrorResponse> httpRequestMethodNotSupportedExceptionHandle(
            HttpRequestMethodNotSupportedException ex) {
        log.error("지원하지 않는 메소드 요청입니다.", ex.getMethod());
        ErrorResponse response = new ErrorResponse(ErrorCode.METHOD_NOT_ALLOWED);
        return new ResponseEntity<>(response, HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception ex) {
        log.error("!!!!!! SERVER ERROR !!!!!!", ex.getMessage());
        ErrorResponse response = new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERR);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    protected ResponseEntity handleException(HttpMessageNotReadableException e) {
        return ResponseEntity.badRequest().body(ErrorCode.UNREADABLE_HTTP_MESSAGE.getMessage());
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    protected ResponseEntity handleException(MissingServletRequestParameterException e) {
        return ResponseEntity.badRequest().body(ErrorCode.BAD_ARGU.getMessage());
    }

    @ExceptionHandler(BadCredentialsException.class)
    protected ResponseEntity handleException(BadCredentialsException e) {
        ErrorResponse response = new ErrorResponse(ErrorCode.BAD_CREDENTIALS);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
}