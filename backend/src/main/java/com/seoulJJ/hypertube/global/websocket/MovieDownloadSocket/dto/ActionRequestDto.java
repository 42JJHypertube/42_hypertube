package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto;

import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.type.SocketActionType;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ActionRequestDto {

    @NotNull(message = "transactionId is required")
    private String transactionId;
    @NotNull(message = "action is required")
    private SocketActionType action;
    @NotNull(message = "torrentHash is required")
    private String torrentHash;

    public ActionRequestDto() {
    }

    public ActionRequestDto(String transactionId, SocketActionType action, String torrentHash) {
        this.transactionId = transactionId;
        this.action = action;
        this.torrentHash = torrentHash;
    }

    public SocketActionType getAction() {
        if (action == null)
            return SocketActionType.NONE;

        return action;
    }

    public String getTorrentHash() {
        return torrentHash;
    }

    @Override
    public String toString() {
        return "ActionRequestDto(transactionId=" + this.getTransactionId() + ", action=" + this.getAction()
                + ", torrentHash="
                + this.getTorrentHash() + ")";
    }
}
