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

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubtitleService {

    @Autowired
    private final MovieRepository movieRepository;

    @Autowired
    private final SubtitleRepository subtitleRepository;

    @Transactional(readOnly = true)
    public List<SubtitleDto> getSubtitleListByMovieId(Long movieId) {
        Movie movie = movieRepository.findById(movieId).orElseThrow(() -> new MovieNotFoundException());
        List<Subtitle> subtitleList = movie.getSubtitleList();
        List<SubtitleDto> subtitleDtoList = subtitleList.stream().map(SubtitleDto::new).collect(Collectors.toList());
        return subtitleDtoList;
    }
}
