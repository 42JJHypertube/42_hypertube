package com.seoulJJ.hypertube.domain.test;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.global.utils.torrent.bt.BittorrentDownloader;
import com.seoulJJ.hypertube.global.utils.torrent.bt.visearch.service.TorrentDownloadService;
import com.seoulJJ.hypertube.global.utils.torrent.jlibtorrent.JlibtorrentDownloader;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private final BittorrentDownloader bittorrentDownloader;
    @Autowired
    private final TorrentDownloadService torrentDownloadService;
    @Autowired
    private final JlibtorrentDownloader jlibtorrentDownloader;

    private final List<String> trackerUrls = List.of(
            "udp://93.158.213.92:1337/announce",
            "udp://23.137.251.46:6969/announce",
            "udp://23.134.90.6:1337/announce",
            "udp://185.243.218.213:80/announce",
            "udp://89.234.156.205:451/announce",
            "udp://107.189.11.58:6969/announce",
            "udp://208.83.20.20:6969/announce",
            "udp://83.146.98.78:6969/announce",
            "udp://109.201.134.183:80/announce",
            "udp://198.100.149.66:6969/announce",
            "udp://23.157.120.14:6969/announce",
            "udp://222.84.21.178:6969/announce",
            "udp://220.130.15.30:6969/announce");

    @PostMapping("/download")
    public String postMethodName(@RequestBody String entity) throws Throwable{
        String magnetLink = "magnet:?xt=urn:btih:8CE082224BE3026057F0DB523725F6530939FF3E&dn=Scrat%3A+Spaced+Out+%282016%29+%5B720p%5D+%5BYTS.MX%5Ds&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Fopen.tracker.cl%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fipv4.tracker.harry.lu%3A80%2Fannounce&tr=https%3A%2F%2Fopentracker.i2p.rocks%3A443%2Fannounce";

        StringBuilder builder = new StringBuilder(magnetLink);
        trackerUrls.forEach(url -> builder.append("&tr=").append(url));

        // bittorrentDownloader.startDownload();
        // torrentDownloadService.processDownloadingByMagnetLink(builder.toString());
        jlibtorrentDownloader.startDownload();
        return "Successed !";
    }

}
