package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto;

import org.springframework.web.socket.TextMessage;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;

@Getter
public class ActionResponseDto {
    private Integer statusCode;
    private String message;

    public ActionResponseDto(Integer statusCode, String message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    @Override
    public String toString() {
        return "ActionResponseDto(statusCode=" + this.getStatusCode() + ", message=" + this.getMessage() + ")";
    }

    public String toJsonString() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "Error: " + e.getMessage();
        }
    }

    static TextMessage createTextMessage(Integer statusCode, String message) {
        return new TextMessage(new ActionResponseDto(statusCode, message).toJsonString());
    }
}
