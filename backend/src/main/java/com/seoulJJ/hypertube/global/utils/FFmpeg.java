package com.seoulJJ.hypertube.global.utils;

import org.springframework.stereotype.Component;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.FFmpegException;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

import jakarta.annotation.PostConstruct;
import lombok.extern.log4j.Log4j2;

@Component
@Log4j2
public class FFmpeg {
    /*
     * FFmpeg 사용 가능 여부 체크
     */
    @PostConstruct
    public void init() throws FFmpegException {
        try {
            log.info("Checking ffmepg...");
            List<String> command = List.of("which", "ffmpeg");
            excuteCommand(command);

            log.info("Checking ffprobe...");
            List<String> command2 = List.of("which", "ffprobe");
            excuteCommand(command2);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new FFmpegException("FFmpeg 초기화 중 에러 발생" + e.getMessage(), ErrorCode.FFMPEG_ERR);
        }
    }

    public void convertVideoToHls(VideoFile videoFile, String outputPath) {
        try {
            String resolution = videoFile.getWidth() + "x" + videoFile.getHeight();
            List<String> command = List.of(
                    "ffmpeg",
                    "-i", videoFile.getAbsolutePath(),
                    "-profile:v", "baseline",
                    "-level", "3.0",
                    "-s", resolution,
                    "-start_number", "0",
                    "-hls_time", "10",
                    "-hls_list_size", "0",
                    "-f", "hls",
                    outputPath + "/" + videoFile.getNameWithoutExtension() + "_"
                            + videoFile.getResolution()
                            + ".m3u8");
            excuteCommand(command);
        } catch (Exception e) {
            throw new FFmpegException("Video 변환중 에러 발생", ErrorCode.FFMPEG_ERR);
        }
    }

    public String getVideoInfo(String filePath) {
        try {
            List<String> command = List.of(
                    "ffprobe",
                    "-v",
                    "error",
                    "-select_streams",
                    "v:0",
                    "-show_entries",
                    "stream=width,height,duration,bit_rate,codec_name",
                    "-of",
                    "default=noprint_wrappers=1",
                    filePath);
            return excuteCommand(command);
        } catch (Exception e) {
            throw new FFmpegException("비디오 정보 조회 중 에러 발생", ErrorCode.FFMPEG_ERR);
        }
    }

    private String excuteCommand(List<String> command) {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder(command);
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
                log.error("명령어 실행 중 에러 발생" + "\nCommend : " + command + "\nExitcode : " + exitCode + "\noutput: "
                        + result.toString());
                throw new RuntimeException("명령어 실행 중 에러 발생");
            }
            return result.toString();
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }
}
