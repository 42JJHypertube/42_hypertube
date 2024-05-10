package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Log4j2
@Component
@RequiredArgsConstructor
public class MovieDownloadSocketHandler extends TextWebSocketHandler {

    @Autowired
    private final TorrentSessionSocketManager torrentSessionSocketManager;

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
        String torrentHash = (String) session.getAttributes().get("torrentHash");
        if (!torrentSessionSocketManager.joinTorrent(torrentHash, session)) {
            session.close(CloseStatus.BAD_DATA);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        torrentSessionSocketManager.removeSession(session);
        session.close();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    }

    public void sendMessage(String torrentHash, String message) {
        torrentSessionSocketManager.getTorrentSessions(torrentHash).forEach(session -> {
            try {
                session.sendMessage(new TextMessage(message));
            } catch (Exception e) {
                log.error(e);
            }
        });
    }

    public void addTorrent(String torrentHash) {
        torrentSessionSocketManager.addTorrent(torrentHash);
    }

    public void removeTorrent(String torrentHash) {
        torrentSessionSocketManager.getTorrentSessions(torrentHash).forEach(session -> {
            try {
                if (session.isOpen())
                    session.close();
            } catch (Exception e) {
                log.error(e);
            }
        });
        torrentSessionSocketManager.removeTorrent(torrentHash);
    }
}