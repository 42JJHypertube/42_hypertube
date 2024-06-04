package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.type;

import java.util.Arrays;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum SocketActionType {
    NONE("NONE"),
    JOIN("JOIN"),
    DETACH("DETACH");

    private final String code;

    public static SocketActionType of(String code) {
        return Arrays.stream(SocketActionType.values())
                .filter(penaltyType -> penaltyType.getCode().equals(code))
                .findAny()
                .orElse(NONE);
    }
}
