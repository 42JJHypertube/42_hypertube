package com.seoulJJ.hypertube.domain.movie;

import lombok.Getter;

@Getter
public class MovieDownDto {
    private String imdbId;
    private String torrentHash;
    private String magnetUrl;

    public MovieDownDto(String magnetUrl, String imdbId) {
        this.imdbId = imdbId;
        this.magnetUrl = "magnet:?xt=urn:btih:2AB83FCA487BF925EC4CD215CA180D2206F8B00B&dn=Book+of+Dragons+%282011%29+%5B1080p%5D+%5BYTS.NZ%5D&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce";
        this.torrentHash = magnetUrl.substring(magnetUrl.indexOf("xt=urn:btih:") + 12, magnetUrl.indexOf("&"));
        this.magnetUrl = magnetUrl;

    }

    @Override
    public String toString() {
        return "MovieDownDto(imdbId=" + this.getImdbId() + ", torrentHash=" + this.getTorrentHash() + ", magnetUrl=" + this.getMagnetUrl() + ")";
    }
}
