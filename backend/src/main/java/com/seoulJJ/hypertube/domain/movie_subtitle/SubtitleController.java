package com.seoulJJ.hypertube.domain.movie_subtitle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.OpenSubtitleAPIClient;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.res_dto.OpenSubtitleListResDto;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subtitles")
public class SubtitleController {

    @Autowired
    private final OpenSubtitleAPIClient openSubtitleAPIClient;

    @GetMapping("/search")
    public ResponseEntity<OpenSubtitleListResDto> searchOpenSubtitleList(@RequestParam String imdbId,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String page) {
        OpenSubtitleListResDto openSubtitleListResDto = openSubtitleAPIClient.getSubtitleListByImdbId(imdbId,
                language, page);
        return ResponseEntity.ok().body(openSubtitleListResDto);
    }
}
