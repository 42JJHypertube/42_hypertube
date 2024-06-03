package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket;

import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import com.seoulJJ.hypertube.domain.movie.type.MovieState;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto.MovieDownloadProgressDto;

public class ProgressBrodcastThread extends Thread {
    String torrentHash;
    CopyOnWriteArraySet<WebSocketSession> sessions;
    MovieDownloadProgressDto progressDto;

    public ProgressBrodcastThread(String torrentHash, MovieDownloadProgressDto progressDto) {
        this.sessions = new CopyOnWriteArraySet<>();
        this.torrentHash = torrentHash;
        this.progressDto = progressDto;
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
            if (progressDto.getStatus() == MovieState.AVAILABLE) {
                break;
            }

            try {
                sleep(1000L);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public void updateProgress(MovieDownloadProgressDto progressDto) {
            this.progressDto = progressDto;
    }
    
    public void addSession(WebSocketSession session) {
            sessions.add(session);
    }

    public void removeSession(WebSocketSession session) {
            sessions.remove(session);
    }
}
