package com.seoulJJ.hypertube.domain.movie_subtitle;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie.MovieRepository;
import com.seoulJJ.hypertube.domain.movie.exception.MovieNotFoundException;
import com.seoulJJ.hypertube.domain.movie_subtitle.dto.SubtitleDto;
import com.seoulJJ.hypertube.domain.movie_subtitle.exception.SubtitleNotFoundException;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.OpenSubtitleAPIClient;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.OpenSubtitleDataDto;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.OpenSubtitleFileDto;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFileManager;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubtitleService {

    @Autowired
    private final MovieRepository movieRepository;

    @Autowired
    private final SubtitleRepository subtitleRepository;

    @Autowired
    private final OpenSubtitleAPIClient openSubtitleAPIClient;

    @Autowired
    private final VideoFileManager videoFileManager;

    @Transactional(readOnly = true)
    public List<SubtitleDto> findSubtitleListByImdbId(String imdbId) {
        Movie movie = movieRepository.findByImdbId(imdbId).orElseThrow(() -> new MovieNotFoundException());
        List<Subtitle> subtitleList = movie.getSubtitleList();
        List<SubtitleDto> subtitleDtoList = subtitleList.stream().map(SubtitleDto::new).collect(Collectors.toList());
        return subtitleDtoList;
    }

    @Transactional(readOnly = true)
    public SubtitleDto findSubtitleByOpenSubtitleId(Long openSubtitleId) {
        Subtitle subtitle = subtitleRepository.findByOpenSubtitleId(openSubtitleId)
                .orElseThrow(() -> new SubtitleNotFoundException());
        return new SubtitleDto(subtitle);
    }

    @Transactional
    public SubtitleDto downLoadOpenSubtitle(OpenSubtitleDataDto openSubtitleDataDto, String imdbId) {
        Movie movie = movieRepository.findByImdbId(imdbId).orElseThrow(() -> new MovieNotFoundException());
        OpenSubtitleFileDto openSubtitleFileDto = openSubtitleAPIClient
                .getSubtitleFileById(openSubtitleDataDto.getFileId());
        String subtitlePath = videoFileManager.downloadSubtitle(movie.getImdbId(), openSubtitleFileDto);

        Subtitle subtitle = new Subtitle(openSubtitleDataDto.getOpenSubtitleId(), subtitlePath,
                openSubtitleDataDto.getLanguage(), movie);
        subtitleRepository.save(subtitle);
        return new SubtitleDto(subtitle);
    }
}
