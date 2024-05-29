package com.seoulJJ.hypertube.global.utils.FileManager;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.concurrent.atomic.AtomicReference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.seoulJJ.hypertube.global.utils.FFmpeg;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
@RequiredArgsConstructor
public class VideoFileManager {

    @Value("${spring.file_path.movies}")
    private String movieDir;

    @Autowired
    private final FFmpeg fFmpeg;

    public void convertVideoToHls(VideoFile videoFile, String outputPath) {
        log.info("VideoFile 정보 : " + videoFile.toString());

        File destDir = new File(outputPath);
        if (!destDir.exists()) {
            destDir.mkdirs();
        }

        log.info("HLS 변환 시작 " + videoFile.getPath() + " -> " + destDir);
        fFmpeg.convertVideoToHls(videoFile, destDir.getAbsolutePath());
        log.info("HLS 변환 완료" + videoFile.getPath() + " -> " + destDir);
    }

    /*
     * .mp4확장자의 비디오파일을 찾아 VideoFile 객체로 반환
     */
    public VideoFile searchVideoFile(File rootDirectory) {

        AtomicReference<VideoFile> videoFileRef = new AtomicReference<>(null);
        if (rootDirectory.exists() && rootDirectory.isDirectory()) {
            try {
                Files.walkFileTree(rootDirectory.toPath(), new SimpleFileVisitor<Path>() {
                    @Override
                    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                        if (file.toFile().isFile() && file.getFileName().toString().toLowerCase().endsWith(".mp4")) {
                            videoFileRef.set(new VideoFile(file));
                            return FileVisitResult.TERMINATE;
                        }
                        return FileVisitResult.CONTINUE;
                    }
                });
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return videoFileRef.get();
    }

    public File getMovieRootPath(String imdbId) {
        File movieRootPath = new File(movieDir + "/" + imdbId);
        if (!movieRootPath.exists()) {
            movieRootPath.mkdirs();
        }
        return movieRootPath;
    }
}
