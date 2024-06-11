package com.seoulJJ.hypertube.domain.movie.torrent.jlibtorrent;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.concurrent.CountDownLatch;
import java.util.List;

import com.frostwire.jlibtorrent.AlertListener;
import com.frostwire.jlibtorrent.LibTorrent;
import com.frostwire.jlibtorrent.SessionManager;
import com.frostwire.jlibtorrent.alerts.AddTorrentAlert;
import com.frostwire.jlibtorrent.alerts.Alert;
import com.frostwire.jlibtorrent.alerts.AlertType;
import com.frostwire.jlibtorrent.alerts.BlockFinishedAlert;
import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie.MovieRepository;
import com.seoulJJ.hypertube.domain.movie.MovieService;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDownDto;
import com.seoulJJ.hypertube.domain.movie.exception.MovieDownLoadFailException;
import com.seoulJJ.hypertube.domain.movie.type.MovieState;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFile;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFileManager;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.MovieDownloadSocketHandler;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto.MovieDownloadProgressDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class JlibtorrentDownloader {

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

    @Autowired
    MovieRepository movieRepository;

    @Autowired
    private final MovieDownloadSocketHandler movieDownloadSocketHandler;

    @Autowired
    private final VideoFileManager videoFileManager;

    // @Transactional //TODO: 트랜잭션 어노테이션을 달면 flush가 바로 되지 않는다. 이유 찾아서 블로깅 하기
    public void startDownloadWithMagnet(MovieDownDto movieDownDto) throws Throwable {
        Movie movie = movieRepository.findByImdbId(movieDownDto.getImdbId()).orElseThrow(); // TODO : Exception
        movie.setMovieState(MovieState.DOWNLOADING);
        movieRepository.saveAndFlush(movie);

        MovieDownloadProgressDto progressDto = new MovieDownloadProgressDto(movieDownDto.getImdbId(),
                movieDownDto.getTorrentHash(), 0,
                MovieState.DOWNLOADING);
        movieDownloadSocketHandler.addProgressBroadcastThread(movieDownDto.getTorrentHash(), progressDto);

        try {
            StringBuilder builder = new StringBuilder(movieDownDto.getMagnetUrl());
            trackerUrls.forEach(url -> builder.append("&tr=").append(url));
            String magnetUrl = builder.toString();

            log.info("Using libtorrent version: " + LibTorrent.version());

            final SessionManager s = new SessionManager();
            final CountDownLatch signal = new CountDownLatch(1);

            s.addListener(new AlertListener() {
                @Override
                public int[] types() {
                    return null;
                }

                @Override
                public void alert(Alert<?> alert) {
                    AlertType type = alert.type();
                    switch (type) {
                        case ADD_TORRENT:
                            log.info("Torrent added");
                            ((AddTorrentAlert) alert).handle().resume();
                            break;
                        case BLOCK_FINISHED:
                            BlockFinishedAlert a = (BlockFinishedAlert) alert;
                            int p = (int) (a.handle().status().progress() * 100);
                            progressDto.setProgress(p);
                            movieDownloadSocketHandler.updateProgress(movieDownDto.getTorrentHash(), progressDto);
                            break;
                        case TORRENT_FINISHED:
                            log.info("Torrent finished");
                            signal.countDown();
                            break;
                    }
                }
            });

            String imdbId = movieDownDto.getImdbId();
            File destDir = videoFileManager.getMovieRootPath(imdbId);

            s.start();
            s.download(magnetUrl, destDir);
            signal.await();
            s.stop();

            movie.setMovieState(MovieState.CONVERTING);
            movieRepository.saveAndFlush(movie);
            progressDto.setProgress(100);
            progressDto.setStatus(MovieState.CONVERTING);
            movieDownloadSocketHandler.updateProgress(movieDownDto.getTorrentHash(), progressDto);

            VideoFile videoFile = videoFileManager.searchVideoFile(destDir);
            videoFileManager.convertVideoToHls(videoFile, destDir.getPath());

            movie.setMovieState(MovieState.AVAILABLE);
            movie.setHlsPlaylistPath(imdbId + "/master.m3u8");
            movieRepository.saveAndFlush(movie);
            progressDto.setStatus(MovieState.AVAILABLE);
            movieDownloadSocketHandler.updateProgress(movieDownDto.getTorrentHash(), progressDto);
        } catch (Exception e) {
            e.printStackTrace();
            movie.setMovieState(MovieState.ERROR);
            movieRepository.saveAndFlush(movie);
            throw new MovieDownLoadFailException("영화 다운로드에 실패했습니다.");
        } finally {
            movieDownloadSocketHandler.removeProgressBroadcastThread(movieDownDto.getTorrentHash());
            MovieService.downloadingMovies.remove(movieDownDto.getImdbId());
        }
    }
}
