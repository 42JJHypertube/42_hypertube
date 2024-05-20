package com.seoulJJ.hypertube.global.utils.FileManager;

import java.io.File;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.StandardCopyOption;
import java.nio.file.attribute.BasicFileAttributes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.seoulJJ.hypertube.global.utils.FFmpeg;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
@RequiredArgsConstructor
public class VideoFileManager {

    @Autowired
    private final FFmpeg fFmpeg;

    public void convertVideoToHls(VideoFile videoFile, String outputPath) {
        log.info("VideoFile 정보 : " + videoFile.toString());
        fFmpeg.convertVideoToHls(videoFile, outputPath);
    }

    public VideoFile restructureFiles(String imdbId, File rootDirectory) {
        String newFileName = imdbId + ".mp4";

        if (rootDirectory.exists() && rootDirectory.isDirectory()) {
            try {
                Files.walkFileTree(rootDirectory.toPath(), new SimpleFileVisitor<Path>() {
                    @Override
                    public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                        log.info("Checking file: " + file.getFileName());
                        if (file.toFile().isFile() && file.getFileName().toString().toLowerCase().endsWith(".mp4")) {
                            log.info("Found .mp4 file: " + file.getFileName());
                            try {
                                Files.copy(file, new File(rootDirectory, newFileName).toPath(),
                                        StandardCopyOption.REPLACE_EXISTING);
                                return FileVisitResult.TERMINATE;
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        return FileVisitResult.CONTINUE;
                    }
                });
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        return new VideoFile(rootDirectory, newFileName);
    }
}
