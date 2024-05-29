package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto.MovieDownloadProgressDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Log4j2
@Component
@RequiredArgsConstructor
public class MovieDownloadSocketHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<String, ProgressBrodcastThread> progressThreads = new ConcurrentHashMap<String, ProgressBrodcastThread>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        ///// 쿼리 출력 /////
        for (String key : session.getAttributes().keySet()) {
            log.info(key + ": " + session.getAttributes().get(key));
        }
        //////////////////

        if (!session.getAttributes().containsKey("torrentHash")) {
            session.close(CloseStatus.BAD_DATA);
            return;
        }
        String torrentHash = session.getAttributes().get("torrentHash").toString();
        progressThreads.get(torrentHash).addSession(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        session.close();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    }

    public void addProgressThread(String torrentHash, MovieDownloadProgressDto progressDto) {
        ProgressBrodcastThread progressThread = new ProgressBrodcastThread(torrentHash, progressDto);
        progressThreads.put(torrentHash, progressThread);
        progressThread.start();
    }

    public void updateProgress(String torrentHash, MovieDownloadProgressDto progressDto) {
        progressThreads.get(torrentHash).updateProgress(progressDto);
    }

    public void removeProgressThread(String torrentHash) {
        progressThreads.get(torrentHash).interrupt();
        progressThreads.remove(torrentHash);
    }
}