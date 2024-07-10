package com.seoulJJ.hypertube.domain.movie_subtitle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie_subtitle.dto.SubtitleDto;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subtitles")
public class SubtitleController {

    @Autowired
    private final SubtitleService subtitleService;

    @GetMapping("/{subtitleId}")
    public ResponseEntity<SubtitleDto> getSubtitleById(@PathVariable Long subtitleId) {
        SubtitleDto subtitleDto = subtitleService.findSubtitleById(subtitleId);
        return ResponseEntity.ok().body(subtitleDto);
    }
}
