package com.seoulJJ.hypertube.domain.movie_subtitle.dto;

import java.util.List;

import lombok.Getter;

@Getter
public class SubtitleListResDto {
    List<SubtitleDto> subtitles;

    public SubtitleListResDto(List<SubtitleDto> subtitles) {
        this.subtitles = subtitles;
    }
}
