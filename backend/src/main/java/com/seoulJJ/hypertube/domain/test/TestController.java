package com.seoulJJ.hypertube.domain.test;

import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.global.utils.VideoConverter;
import java.io.File;


import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/test")
public class TestController {

    private final VideoConverter videoConverter;

    @PostMapping("/convert")
    public String postMethodName(@RequestBody String entity) {
        File videoFile = new File(
                "/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies/Scrat Spaced Out (2016) [YTS.AG]/Scrat.Spaced.Out.2016.720p.BluRay.x264-[YTS.AG].mp4");
        log.info("videoFile: " + videoFile.getAbsolutePath());
    
        videoConverter.convertVideo(videoFile,
                "/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies/Scrat Spaced Out (2016) [YTS.AG]");
        return "Done!";
    }

}
