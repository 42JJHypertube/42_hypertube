package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.res_dto.OpenSubtitleListResDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenSubtitleAPIService {

    @Autowired
    private final OpenSubtitleAPIClient openSubtitleAPIClient;

    public OpenSubtitleListResDto getSubtitleListByImdbId(String imdbId, String language) {
        return openSubtitleAPIClient.getSubtitleListByImdbId(imdbId, null);
    } // TODO : 피드백 질문하기
}
