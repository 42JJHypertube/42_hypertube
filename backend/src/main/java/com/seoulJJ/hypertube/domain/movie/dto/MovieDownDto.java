package com.seoulJJ.hypertube.domain.movie.dto;

import lombok.Getter;

@Getter
public class MovieDownDto {
    private String imdbId;
    private String torrentHash;
    private String magnetUrl;

    public MovieDownDto(String magnetUrl, String imdbId) {
        this.imdbId = imdbId;
        this.torrentHash = magnetUrl.substring(magnetUrl.indexOf("xt=urn:btih:") + 12, magnetUrl.indexOf("&"));
        this.magnetUrl = magnetUrl;
    }

    @Override
    public String toString() {
        return "MovieDownDto(imdbId=" + this.getImdbId() + ", torrentHash=" + this.getTorrentHash() + ", magnetUrl=" + this.getMagnetUrl() + ")";
    }
}
