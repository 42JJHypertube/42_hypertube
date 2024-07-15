package com.seoulJJ.hypertube.domain.movie_subtitle;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie_subtitle.dto.SubtitleDto;
import com.seoulJJ.hypertube.domain.movie_subtitle.dto.SubtitleListResDto;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.OpenSubtitleAPIClient;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.OpenSubtitleDataDto;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.res_dto.OpenSubtitleListResDto;

import lombok.RequiredArgsConstructor;
import okhttp3.Response;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/subtitles")
public class SubtitleController {

    @Autowired
    private final SubtitleService subtitleService;

    @Autowired
    private final OpenSubtitleAPIClient openSubtitleAPIClient;

    @GetMapping("/movies/{imdbId}")
    public ResponseEntity<SubtitleListResDto> getSubtitlesByImdbId(@PathVariable String imdbId) {
        List<SubtitleDto> subtitleDtoList = subtitleService.findSubtitleListByImdbId(imdbId);
        return ResponseEntity.ok().body(new SubtitleListResDto(subtitleDtoList));
    }

    @GetMapping("/{openSubtitleId}")
    public ResponseEntity<SubtitleDto> getSubtitleByOpenSubtitleId(@PathVariable Long openSubtitleId) {
        SubtitleDto subtitleDto = subtitleService.findSubtitleByOpenSubtitleId(openSubtitleId);
        return ResponseEntity.ok().body(subtitleDto);
    }

    @PostMapping("/download/movies/{imdbId}")
    public ResponseEntity<SubtitleDto> getSubtitleByFileId(@RequestBody OpenSubtitleDataDto openSubtitleDataDto,
            @RequestParam String imdbId) {
        SubtitleDto subtitleDto = subtitleService.downLoadOpenSubtitle(openSubtitleDataDto, imdbId);
        return ResponseEntity.ok().body(subtitleDto);
    }

    @GetMapping("/search")
    public ResponseEntity<OpenSubtitleListResDto> searchOpenSubtitleList(@RequestParam String imdbId,
            @RequestParam(required = false) String language,
            @RequestParam(required = false) String page) {
        OpenSubtitleListResDto openSubtitleListResDto = openSubtitleAPIClient.getSubtitleListByImdbId(imdbId,
                language, page);
        return ResponseEntity.ok().body(openSubtitleListResDto);
    }
}
