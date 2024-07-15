package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class OpenSubtitleDataDto {
    private Long openSubtitleId; // OpenSubtitle의 Id
    private String imdbId;
    private String language; // 자막 언어
    private Long fileId; // OpenSubtitle의 자막 파일 Id, 추후 다운로드 요청시 사용
    private String fileName; // 자막 파일 이름

    public OpenSubtitleDataDto(JsonElement jsonElement) {
        JsonObject node = jsonElement.getAsJsonObject();
        this.openSubtitleId = node.get("id").getAsLong();

        JsonObject attributes = node.getAsJsonObject("attributes");
        this.language = attributes.get("language").getAsString();

        JsonArray filesArray = attributes.getAsJsonArray("files");
        for (JsonElement fileElement : filesArray) {
            JsonObject file = fileElement.getAsJsonObject();
            this.fileId = file.get("file_id").getAsLong();
            this.fileName = file.get("file_name").getAsString();
        }
    }
}
