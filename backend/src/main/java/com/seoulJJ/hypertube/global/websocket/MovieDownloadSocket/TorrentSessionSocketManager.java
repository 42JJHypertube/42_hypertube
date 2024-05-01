package com.seoulJJ.hypertube.global.websocket.MovieDownloadSocket;

import java.util.concurrent.ConcurrentHashMap;
import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

@Component
public class TorrentSessionSocketManager {
    private static final ConcurrentHashMap<String, List<WebSocketSession>> DOWNLOADING_TORRENTS = new ConcurrentHashMap<String, List<WebSocketSession>>();
    private static final ConcurrentHashMap<String, List<String>> CLIENTS = new ConcurrentHashMap<String, List<String>>();

    public List<WebSocketSession> getTorrentSessions(String torrentHash) {
        return DOWNLOADING_TORRENTS.getOrDefault(torrentHash, new ArrayList<>());
    }

    public boolean joinTorrent(String torrentHash, WebSocketSession session) {
        if (!addSessionToTorrent(session, torrentHash))
            return false;
        addTorrentToSession(torrentHash, session);
        return true;
    }

    public boolean removeSession(WebSocketSession session) {
        List<String> torrentHashList = CLIENTS.getOrDefault(session.getId(), new ArrayList<>());
        for (String torrentHash : torrentHashList) {
            List<WebSocketSession> sessions = DOWNLOADING_TORRENTS.getOrDefault(torrentHash, new ArrayList<>());
            sessions.remove(session);
            DOWNLOADING_TORRENTS.put(torrentHash, sessions);
        }
        CLIENTS.remove(session.getId());
        return true;
    }

    public boolean removeTorrent(String torrentHash) {
        List<WebSocketSession> sessions = DOWNLOADING_TORRENTS.getOrDefault(torrentHash, new ArrayList<>());
        for (WebSocketSession session : sessions) {
            List<String> torrents = CLIENTS.getOrDefault(session.getId(), new ArrayList<>());
            torrents.remove(torrentHash);
            CLIENTS.put(session.getId(), torrents);
        }
        DOWNLOADING_TORRENTS.remove(torrentHash);
        return true;
    }

    public void addTorrent(String torrentHash) {
        DOWNLOADING_TORRENTS.put(torrentHash, new ArrayList<>());
    }

    private boolean addSessionToTorrent(WebSocketSession session, String torrentHash) {
        List<WebSocketSession> sessions = DOWNLOADING_TORRENTS.get(torrentHash);
        if (sessions == null) {
            return false;
        }
        sessions.add(session);
        DOWNLOADING_TORRENTS.put(torrentHash, sessions);
        return true;
    }

    private void addTorrentToSession(String torrentHash, WebSocketSession session) {
        List<String> torrents = CLIENTS.getOrDefault(session.getId(), new ArrayList<>());

        torrents.add(torrentHash);
        CLIENTS.put(session.getId(), torrents);
    }
}
