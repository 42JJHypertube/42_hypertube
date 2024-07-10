package com.seoulJJ.hypertube.domain.movie_subtitle;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie_subtitle.dto.SubtitleDto;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subtitles")
public class SubtitleController {

    private final SubtitleService subtitleService;

    /*
     * @param movieId
     * @return List<String>
     * @description 해당 영화의 이용가능한 자막과 추가할수 있는 자막 리스트를 반환한다.
     */
    @GetMapping("/movies/{movieId}/available")
    public ResponseEntity<List<SubtitleDto>> getSubtitleList(@PathVariable Long movieId) {
        List<SubtitleDto> subtitleList = subtitleService.getSubtitleListByMovieId(movieId);
        return null;
    }
}
