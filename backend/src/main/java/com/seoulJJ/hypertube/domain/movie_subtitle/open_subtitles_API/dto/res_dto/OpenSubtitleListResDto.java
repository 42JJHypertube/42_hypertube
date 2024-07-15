package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.res_dto;

import java.util.List;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.OpenSubtitleDataDto;

import lombok.Getter;

@Getter
public class OpenSubtitleListResDto {
    private Integer totalPages;
    private Integer totalCount;
    private Integer perPage;
    private Integer page;
    private List<OpenSubtitleDataDto> data;

    public OpenSubtitleListResDto(String jsonString) {
        Gson gson = new Gson();
        JsonObject rootObject = gson.fromJson(jsonString, JsonObject.class);

        this.totalPages = rootObject.get("total_pages").getAsInt();
        this.totalCount = rootObject.get("total_count").getAsInt();
        this.perPage = rootObject.get("per_page").getAsInt();
        this.page = rootObject.get("page").getAsInt();

        JsonArray dataArray = rootObject.getAsJsonArray("data");
        this.data = new ArrayList<>();

        for (JsonElement element : dataArray) {
            this.data.add(new OpenSubtitleDataDto(element));
        }
    }

    public String toString() {
        return "totalPages: " + totalPages + ", totalCount: " + totalCount + ", perPage: " + perPage + ", page: " + page
                + ", data: " + data;
    }
}
