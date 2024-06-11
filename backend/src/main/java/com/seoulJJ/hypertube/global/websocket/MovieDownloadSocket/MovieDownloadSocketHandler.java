package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket;

import java.util.List;
import java.util.ArrayList;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.nimbusds.jose.shaded.gson.Gson;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto.ActionRequestDto;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto.ActionResponseDto;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.dto.MovieDownloadProgressDto;
import com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket.testThread.TestThread;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Component
@RequiredArgsConstructor
public class MovieDownloadSocketHandler extends TextWebSocketHandler {

    private static final ConcurrentHashMap<String, ProgressBrodcastThread> progressThreads = new ConcurrentHashMap<String, ProgressBrodcastThread>();

    @PostConstruct
    public void testThreadStart() {
        TestThread progressThread = new TestThread();
        progressThreads.put("TEST", progressThread);
        progressThread.start();
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        List<String> keys = new ArrayList<>(progressThreads.keySet());
        String jsonKeys = new Gson().toJson(keys);
        session.sendMessage(new TextMessage(jsonKeys));
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        session.close();
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        ActionRequestDto req = parseActionRequest(message.getPayload());
        try {
            ProgressBrodcastThread pbt = progressThreads.get(req.getTorrentHash());
            if (pbt == null)
                throw new RuntimeException("ProgressThread not found");

            ActionResponseDto res;
            switch (req.getAction()) {
                case JOIN:
                    pbt.addSession(session);
                    res = new ActionResponseDto(req.getTransactionId(), 201,
                            "Joined -> " + req.getTorrentHash());
                    break;
                case DETACH:
                    pbt.removeSession(session);
                    res = new ActionResponseDto(req.getTransactionId(), 201,
                            "Detached -> " + req.getTorrentHash());
                    break;
                default:
                    throw new RuntimeException("Invalid action");
            }

            session.sendMessage(new TextMessage(res.toJsonString()));
        } catch (Exception e) {
            ActionResponseDto res = new ActionResponseDto(req.getTransactionId(), 400, e.getMessage());
            session.sendMessage(new TextMessage(res.toJsonString()));
        }
    }

    public void addProgressBroadcastThread(String torrentHash, MovieDownloadProgressDto progressDto) {
        ProgressBrodcastThread progressThread = new ProgressBrodcastThread(torrentHash, progressDto);
        progressThreads.put(torrentHash, progressThread);
        progressThread.start();
    }

    public void updateProgress(String torrentHash, MovieDownloadProgressDto progressDto) {
        progressThreads.get(torrentHash).updateProgress(progressDto);
    }

    public void removeProgressBroadcastThread(String torrentHash) {
        progressThreads.get(torrentHash).interrupt();
        progressThreads.remove(torrentHash);
    }

    private ActionRequestDto parseActionRequest(String message) {
        try {
            ActionRequestDto req = new Gson().fromJson(message, ActionRequestDto.class);
            return req;
        } catch (Exception e) {
            throw new RuntimeException("Invalid message format");
        }
    }
}