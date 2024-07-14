package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.res_dto;

import java.util.List;
import java.util.ArrayList;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.seoulJJ.hypertube.domain.movie_subtitle.dto.SubtitleDto;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.OpenSubtitleDataDto;

public class OpenSubtitleListResDto {
    private Integer totalPages;
    private Integer totalCount;
    private Integer perPage;
    private Integer page;
    private List<OpenSubtitleDataDto> data;


    public OpenSubtitleListResDto(int totalPages, int totalCount, int perPage, int page, List<OpenSubtitleDataDto> data) {
        this.totalPages = totalPages;
        this.totalCount = totalCount;
        this.perPage = perPage;
        this.page = page;
        this.data = data;
    }

    public OpenSubtitleListResDto(String jsonString) {
        Gson gson = new Gson();
        JsonObject rootObject = gson.fromJson(jsonString, JsonObject.class);

        this.totalPages = rootObject.get("totalPages").getAsInt();
        this.totalCount = rootObject.get("totalCount").getAsInt();
        this.perPage = rootObject.get("perPage").getAsInt();
        this.page = rootObject.get("page").getAsInt();

        JsonArray dataArray = rootObject.getAsJsonArray("data");
        List<OpenSubtitleDataDto> openSubtitleDataDtoList = new ArrayList<>();

        for (JsonElement element : dataArray) {
            openSubtitleDataDtoList.add(new OpenSubtitleDataDto(element));
        }
    }

    public String toString() {
        return "totalPages: " + totalPages + ", totalCount: " + totalCount + ", perPage: " + perPage + ", page: " + page
                + ", data: " + data;
    }
}
