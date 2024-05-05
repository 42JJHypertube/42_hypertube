package com.seoulJJ.hypertube.global.utils;

import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.File;
import java.io.IOException;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
public class VideoConverter {

    /*
     * FFmpeg 사용 가능 여부 체크
     */
    @PostConstruct
    public void init() {
        try {
            log.info("Checking ffmepg...");
            ProcessBuilder processBuilder = new ProcessBuilder("which", "ffmpeg");
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            StringBuilder result = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                result.append(line).append("\n");
            }

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                log.error("FFmpeg을 찾을 수 없습니다.");
                throw new RuntimeException("FFmpeg을 찾을 수 없습니다.");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RuntimeException("FFmpeg 초기화 중 에러 발생");
        }
    }

    public void convertVideo(File videoFile, String outputPath) {
        try {
            String[] command = {
                    "ffmpeg",
                    "-i", videoFile.getAbsolutePath(),
                    "-profile:v", "baseline",
                    "-level", "3.0",
                    "-s", "1920x1080",
                    "-start_number", "0",
                    "-hls_time", "10",
                    "-hls_list_size", "0",
                    "-f", "hls",
                    outputPath + "/" + videoFile.getName() + ".m3u8"
            };

            // ProcessBuilder를 사용하여 FFmpeg 명령어 실행
            ProcessBuilder pb = new ProcessBuilder(command);
            pb.redirectErrorStream(true); // 에러 출력을 표준 출력으로 병합

            // 명령어 실행
            log.info("FFmpeg 실행 명령어: " + String.join(" ", command));
            Process process = pb.start();
            log.info("FFmpeg 실행 시작");
            int exitCode = process.waitFor(); // 프로세스가 종료될 때까지 대기

            // 프로세스 종료 코드 확인
            log.info("FFmpeg 실행 종료 코드: " + exitCode);
            if (exitCode != 0) {
                throw new RuntimeException("Video 변환중 에러 발생");
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
