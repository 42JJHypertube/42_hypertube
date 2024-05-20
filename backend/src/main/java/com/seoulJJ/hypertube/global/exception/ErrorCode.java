package com.seoulJJ.hypertube.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {

    //auth
    BAD_CREDENTIALS(401, "AU100", "BAD CREDENTIALS"),
    EXPIRED_JWT(401, "AU101", "EXPIRED JWT"),
    NO_COOKIE(404, "AU102", "NO COOKIES"),
    INVALID_JWT(401, "AU103", "INVALID JWT"),
    
    //user
    USER_NOT_FOUND(404, "UR100", "USER NOT FOUND"),
    USER_IMAGE_NOT_FOUND(404, "UR200", "USER IMAGE NOT FOUND"),
    USER_IMAGE_TOO_LARGE(413, "UR401", "USER IMAGE IS TOO LARGE"),
    USER_IMAGE_WRONG_TYPE(415, "UR402", "USER IMAGE TYPE IS WRONG"),
    KAKAO_OAUTH2_NOT_FOUND(404, "UR101", "KAKAO OAUTH2 NOT FOUND"),
    KAKAO_OAUTH2_DUPLICATE(409, "UR300", "KAKAO OAUTH2 ALREADY EXIST"),
    USER_TEXT_COLOR_WRONG_TYPE(401, "UR403", "USER TEXT COLOR CODE IS WRONG"),
    USER_ALREADY_ATTENDANCE(409, "UR301", "USER ALREADY ATTENDANCE"),

    //common
    INTERNAL_SERVER_ERR(500, "CM001","INTERNAL SERVER ERROR"),
    NOT_FOUND(404, "CM002", "NOT FOUND"),
    BAD_REQUEST(400, "CM003", "BAD REQUEST"),
    UNAUTHORIZED(401, "CM004", "UNAUTHORIZED"),
    METHOD_NOT_ALLOWED(405, "CM005", "METHOD NOT ALLOWED"),
    PAGE_NOT_FOUND(404, "CM006", "PAGE NOT FOUND"),
    VALID_FAILED(400, "CM007" , "Valid Test Failed."),
    BAD_ARGU(400, "ARGUMENT-ERR-400", "잘못된 argument 입니다."),
    UNREADABLE_HTTP_MESSAGE(400, "CM008", "유효하지 않은 HTTP 메시지입니다."),
    FFMPEG_ERR(500, "CM009", "FFMPEG ERR"),
    NULL_POINT(500, "CM010", "NULL POINT EXCEPTION");



    private final int status;
    private final String errCode;
    private String message;

    public void setMessage(String msg) {
        this.message = msg;
    }
}
