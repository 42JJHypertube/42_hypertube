package com.seoulJJ.hypertube.domain;

import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.OpenSubtitleAPIClient;

import io.lettuce.core.dynamic.annotation.Param;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    @Autowired
    private final OpenSubtitleAPIClient openSubtitleAPIClient;

    @GetMapping
    public void testMain(@Param("imdbId") String imdbId) {
        openSubtitleAPIClient.getSubtitleListByImdbId(imdbId);
    }
}
