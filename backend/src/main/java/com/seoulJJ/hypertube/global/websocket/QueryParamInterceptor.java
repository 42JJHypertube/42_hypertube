package com.seoulJJ.hypertube.global.websocket;

import java.util.Map;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import lombok.NoArgsConstructor;

@Component
@NoArgsConstructor
public class QueryParamInterceptor implements HandshakeInterceptor {

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {
        String queryParam = request.getURI().getQuery();
        if (queryParam == null) {
            return false;
        }
        String[] queryParams = queryParam.split("&");
        for (String param : queryParams) {
            if (!addQueryParam(param, attributes)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response,
            org.springframework.web.socket.WebSocketHandler wsHandler, Exception exception) {
        // TODO Auto-generated method stub
    }

    private boolean addQueryParam(String param, Map<String, Object> attributes) {
        String[] keyValue = param.split("=");
        if (keyValue.length != 2) {
            return false;
        }
        attributes.put(keyValue[0], keyValue[1]);
        return true;
    }
}