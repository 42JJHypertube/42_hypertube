package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.OpenSubtitleFileDto;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.res_dto.OpenSubtitleListResDto;
import com.seoulJJ.hypertube.global.exception.custom.OpenSubtitleAPIException;

import okhttp3.HttpUrl;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Service
public class OpenSubtitleAPIClient {
    private final String endpoint;
    private final OkHttpClient client;
    private final Request.Builder requestBuilder;

    public OpenSubtitleAPIClient(@Value("${spring.opensubtitles.api-key}") String key,
            @Value("${spring.opensubtitles.endpoint}") String endpoint) {
        this.endpoint = endpoint;

        this.client = new OkHttpClient();

        this.requestBuilder = new Request.Builder()
                .addHeader("User-Agent", "Hypertube v0.1")
                .addHeader("Api-Key", key)
                .addHeader("Accept", "application/json");
    }

    public OpenSubtitleListResDto getSubtitleListByImdbId(String imdbId, String language, String page) {
        HttpUrl.Builder urlBuilder = HttpUrl.parse(endpoint + "/subtitles").newBuilder();
        urlBuilder.addQueryParameter("imdb_id", imdbId);
        urlBuilder.addQueryParameter("ai_translated", "false");
        urlBuilder.addQueryParameter("order_by", "download_count");

        if (language != null) {
            urlBuilder.addQueryParameter("languages", language);
        }
        if (page != null) {
            urlBuilder.addQueryParameter("page", page);
        }
        HttpUrl httpUrl = urlBuilder.build();
        Request request = requestBuilder
                .url(httpUrl)
                .build();
        String jsonResponse = doRequest(request);
        return new OpenSubtitleListResDto(jsonResponse);
    }

    public OpenSubtitleFileDto getSubtitleFileById(Long fileId) {
        HttpUrl httpUrl = HttpUrl.parse(endpoint + "/download").newBuilder().build();
        RequestBody body = RequestBody.create("{\"file_id\":\"" + fileId + "\"}",
                MediaType.parse("application/json"));

        Request request = requestBuilder
                .url(httpUrl)
                .post(body)
                .build();

        String jsonResponse = doRequest(request);
        return new OpenSubtitleFileDto(jsonResponse);
    }

    private String doRequest(Request request) {
        try {
            Response response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                return response.body().string();
            } else {
                throw new OpenSubtitleAPIException("OpenSubtitle: Error: " + response.message(), response.code());
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new OpenSubtitleAPIException("Internal Server Error", 500);
        }
    }
}
