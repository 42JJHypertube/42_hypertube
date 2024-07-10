package com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenSubtitleAPIService {
    
    @Value("spring.open-subtitle.key")
    private final String screteKey;
    
}
