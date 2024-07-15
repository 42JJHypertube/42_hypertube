package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

import lombok.Getter;

@Getter
public class OpenSubtitleFileDto {
    private String link;
    private String fileName;

    public OpenSubtitleFileDto(String jsonString)
    {     
        Gson gson = new Gson();
        JsonObject rootObject = gson.fromJson(jsonString, JsonObject.class);
        this.link = rootObject.get("link").getAsString();
        this.fileName = rootObject.get("file_name").getAsString();
    }
}
