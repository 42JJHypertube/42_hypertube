package com.seoulJJ.hypertube.domain.test;

import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.global.utils.FileManager.VideoFile;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFileManager;

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

    private final VideoFileManager videoConverter;

    @PostMapping("/convert")
    public String postMethodName(@RequestBody String entity) {
        VideoFile videoFile = new VideoFile(
                "/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies/Scrat Spaced Out (2016) [YTS.AG]/Scrat.Spaced.Out.2016.720p.BluRay.x264-[YTS.AG].mp4");

        videoConverter.convertVideoToHls(videoFile,
                "/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies/Scrat Spaced Out (2016) [YTS.AG]");
        return "Done!";
    }

    @PostMapping("/videos/getInfoTest")
    public String getVideoInfoTest(@RequestBody String entity) {
        log.info("getVideoInfoTest: " + entity);
        VideoFile videoFile = new VideoFile(
                "/Users/kimjaehyuk/Desktop/42_hypertube/file_storage/movies/dragon/dragon.mp4");
        return videoFile.toString();
    }
}
