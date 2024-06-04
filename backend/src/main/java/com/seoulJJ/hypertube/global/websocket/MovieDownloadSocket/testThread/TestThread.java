package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.testThread;

import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie.type.MovieState;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.ProgressBrodcastThread;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto.MovieDownloadProgressDto;

public class TestThread extends ProgressBrodcastThread {
    private Integer convertingCnt = 0;
    private Integer availableCnt = 0;

    public TestThread() {
        super("TEST", new MovieDownloadProgressDto("test0000", "TEST", 0, MovieState.DOWNLOADING));
        // this.torrentHash = "TEST";
        // this.sessions = new CopyOnWriteArraySet<>();
        // this.progressDto = new MovieDownloadProgressDto("test0000", "TEST", 0,
        // MovieState.DOWNLOADING);
    }

    @Override
    public void run() {
        while (true) {
            synchronized (progressDto) {
                TextMessage message = new TextMessage(progressDto.toJsonString());
                for (WebSocketSession session : sessions) {
                    if (!session.isOpen()) {
                        sessions.remove(session);
                        continue;
                    }

                    try {
                        session.sendMessage(message);
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }

            switch (progressDto.getStatus()) {
                case DOWNLOADING:
                    if (progressDto.getProgress() < 100) {
                        progressDto.setProgress(progressDto.getProgress() + 10);
                    } else {
                        progressDto.setStatus(MovieState.CONVERTING);
                    }
                    break;
                case CONVERTING:
                    if (convertingCnt < 5) {
                        convertingCnt++;
                    } else {
                        progressDto.setStatus(MovieState.AVAILABLE);
                        convertingCnt = 0;
                    }
                    break;
                case AVAILABLE:
                    if (availableCnt < 5) {
                        availableCnt++;
                    } else {
                        progressDto.setProgress(0);
                        progressDto.setStatus(MovieState.DOWNLOADING);
                    }
                    break;
            }
            try {
                sleep(1000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}
