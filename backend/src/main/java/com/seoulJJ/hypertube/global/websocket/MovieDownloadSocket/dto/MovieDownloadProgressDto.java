package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto;

import com.seoulJJ.hypertube.domain.movie.type.MovieState;

import lombok.Getter;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Getter
public class MovieDownloadProgressDto {
    private String imdbId;
    private String torrentHash;
    private Integer progress;
    private MovieState status;

    public MovieDownloadProgressDto(String imdbId, String torrentHash, int progress, MovieState status) {
        this.imdbId = imdbId;
        this.torrentHash = torrentHash;
        this.progress = progress;
        this.status = status;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }

    public void setStatus(MovieState status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "MovieDownloadProgressDto(imdbId=" + this.getImdbId() + ", progress=" + this.getProgress() + ", status="
                + this.getStatus() + ")";
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
