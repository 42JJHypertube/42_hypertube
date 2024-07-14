package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.res_dto.OpenSubtitleListResDto;
import com.seoulJJ.hypertube.global.exception.custom.OpenSubtitleAPIException;

import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
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
                .addHeader("Api-Key", key);
    }

    public OpenSubtitleListResDto getSubtitleListByImdbId(String imdbId, String language) {
        HttpUrl.Builder urlBuilder = HttpUrl.parse(endpoint + "/subtitles").newBuilder();
        urlBuilder.addQueryParameter("imdb_id", imdbId);
        urlBuilder.addQueryParameter("ai_translated", "false");
        urlBuilder.addQueryParameter("order_by", "download_count");

        if (language != null) {
            urlBuilder.addQueryParameter("languages", language);
        }
        HttpUrl httpUrl = urlBuilder.build();
        Request request = requestBuilder
                .url(httpUrl)
                .build();
        String jsonResponse = doRequest(request);
        return new OpenSubtitleListResDto(jsonResponse);
    }

    private String doRequest(Request request) {
        try {
            Response response = client.newCall(request).execute();
            if (response.isSuccessful()) {
                return response.body().string();
            } else {
                throw new OpenSubtitleAPIException("OpenSubtitle: Error: " + response.message(), response.code());
            }
        } catch (Exception e) {
            throw new OpenSubtitleAPIException("Internal Server Error", 500);
        }
    }
}
