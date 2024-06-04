package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;

@Getter
public class ActionResponseDto {
    private String transactionId;
    private Integer statusCode;
    private String message;

    public ActionResponseDto(String transactionId, Integer statusCode, String message) {
        this.transactionId = transactionId;
        this.statusCode = statusCode;
        this.message = message;
    }

    @Override
    public String toString() {
        return "ActionResponseDto(transactionId=" + this.getTransactionId() + ", statusCode=" + this.getStatusCode()
                + ", message=" + this.getMessage() + ")";
    }

    public String toJsonString() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            return "Error: " + e.getMessage();
        }
    }
}
