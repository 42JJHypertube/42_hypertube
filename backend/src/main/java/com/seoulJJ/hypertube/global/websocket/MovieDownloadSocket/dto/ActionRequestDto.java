package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto;

import lombok.Getter;

@Getter
public class ActionRequestDto {

    private String action;
    private String torrentHash;

    public ActionRequestDto() {
    }

    public ActionRequestDto(String action, String torrentHash) {
        this.action = action;
        this.torrentHash = torrentHash;
    }

    public String getAction() {
        return action;
    }

    public String getTorrentHash() {
        return torrentHash;
    }

    @Override
    public String toString() {
        return "ActionRequestDto(action=" + this.getAction() + ", torrentHash=" + this.getTorrentHash() + ")";
    }
}
