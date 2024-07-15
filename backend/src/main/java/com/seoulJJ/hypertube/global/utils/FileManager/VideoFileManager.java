package com.seoulJJ.hypertube.global.utils.FileManager;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.concurrent.atomic.AtomicReference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie_subtitle.open_subtitles_API.dto.OpenSubtitleFileDto;
import com.seoulJJ.hypertube.global.exception.custom.OpenSubtitleAPIException;
import com.seoulJJ.hypertube.global.utils.FFmpeg;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

@Component
@Log4j2
@RequiredArgsConstructor
public class VideoFileManager {

    private static final String[] VIDEO_EXTENSIONS = { "mp4", "mkv", "avi", "mov", "wmv" };

    @Value("${spring.file_path.movies}")
    private String movieDir;

    @Autowired
    private final FFmpeg fFmpeg;

    private static final OkHttpClient client = new OkHttpClient();

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
                        if (file.toFile().isFile() && isVideoFile(file)) {
                            System.out.println("비디오 파일 찾음 : " + file.toString());
                            videoFileRef.set(new VideoFile(file));
                            return FileVisitResult.TERMINATE;
                        }
                        return FileVisitResult.CONTINUE;
                    }
                });
            } catch (IOException e) {
                e.printStackTrace();
                throw new RuntimeException("비디오 파일을 찾는 도중 에러 발생");
            }
        }

        VideoFile videoFile = videoFileRef.get();
        if (videoFile == null)
            throw new RuntimeException("영상 미디어 파일을 찾을수 없습니다.");
        return videoFileRef.get();
    }

    public String downloadSubtitle(String imdbId, OpenSubtitleFileDto openSubtitleFileDto) {
        String url = openSubtitleFileDto.getLink();
        String fileName = openSubtitleFileDto.getFileName();

        File rootDir = this.getMovieRootPath(imdbId);
        File subDir = new File(rootDir, "sub");
        if (!subDir.exists()) {
            subDir.mkdirs();
        }
        System.out.println("Subtitle download path : " + subDir + "\n" + fileName);
        File dest = new File(subDir, fileName);

        Request request = new Request.Builder().url(url).build();
        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new OpenSubtitleAPIException("Failed to download file: " + response, response.code());
            }

            try (InputStream inputStream = response.body().byteStream();
                    OutputStream outputStream = new FileOutputStream(dest)) {
                byte[] buffer = new byte[2048];
                int length;
                while ((length = inputStream.read(buffer)) != -1) {
                    outputStream.write(buffer, 0, length);
                }
            } catch (IOException e) {
                e.printStackTrace();
                throw new OpenSubtitleAPIException("OpenSubtitleAPI : Failed to save file: " + e.getMessage(), 500);
            }
        } catch (IOException e) {
            e.printStackTrace();
            throw new OpenSubtitleAPIException("OpenSubtitleAPI : Failed to download file: " + e.getMessage(), 500);
        }
        return "/" + imdbId + "/sub/" + fileName;
    }

    public File getMovieRootPath(String imdbId) {
        File movieRootPath = new File(movieDir + "/" + imdbId);
        if (!movieRootPath.exists()) {
            movieRootPath.mkdirs();
        }
        return movieRootPath;
    }

    private static boolean isVideoFile(Path file) {
        String fileName = file.getFileName().toString().toLowerCase();
        for (String extension : VIDEO_EXTENSIONS) {
            if (fileName.endsWith("." + extension)) {
                return true;
            }
        }
        return false;
    }
}
