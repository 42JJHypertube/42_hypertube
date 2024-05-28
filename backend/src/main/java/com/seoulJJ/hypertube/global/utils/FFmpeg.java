package com.seoulJJ.hypertube.global.utils;

import org.springframework.stereotype.Component;

import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.FFmpegException;
import com.seoulJJ.hypertube.global.utils.FileManager.VideoFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
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
            List<String> command = makeConvertCommand(videoFile, outputPath);
            excuteCommand(command);
        } catch (Exception e) {
            e.printStackTrace();
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

    private List<String> makeConvertCommand(VideoFile videoFile, String outputPath) {
        final Integer height = videoFile.getHeight();
        List<String> command = new ArrayList<>(); // Use mutable ArrayList instead of immutable List

        command.addAll(List.of("ffmpeg", "-i", videoFile.getAbsolutePath(), "-preset", "veryfast", "-threads", "0"));

        Integer numberOfVideos;
        final List<String> destResolution = List.of("360", "720", "1080", "2080");
        final List<String> destVideoBitrate = List.of("600k", "900k", "900k", "900k");
        final List<String> destAudioBitrate = List.of("64k", "128k", "128k", "128k");
        if (height <= 360) {
            numberOfVideos = 1;
        } else if (height <= 720) {
            numberOfVideos = 2;
        } else if (height <= 1080) {
            numberOfVideos = 3;
        } else {
            numberOfVideos = 4;
        }

        String varStringMapArg = "";
        List<String> destFillterCommand = new ArrayList<>();
        for (int i = 0; i < numberOfVideos; i++) {
            command.addAll(List.of("-map", "0:v:0", "-map", "0:a:0"));
            destFillterCommand.addAll(List.of("-filter:v:" + i,
                    "scale=-2:" + destResolution.get(i) + ":force_original_aspect_ratio=decrease", "-maxrate:v:" + i,
                    destVideoBitrate.get(i), "-b:a:" + i, destAudioBitrate.get(i)));
            varStringMapArg = varStringMapArg + "v:" + i + ",a:" + i + ",name:" + destResolution.get(i) + "p";
            if (i != numberOfVideos - 1) {
                varStringMapArg = varStringMapArg + " ";
            }
        }
        // varStringMapArg = varStringMapArg + "\"";
        command.addAll(List.of("-c:v", videoFile.getCodecName(), "-crf", "22", "-c:a", "copy"));
        command.addAll(destFillterCommand);
        command.addAll(List.of("-f", "hls", "-hls_time", "10", "-hls_playlist_type", "vod", "-hls_list_size", "0",
                "-hls_flags", "independent_segments"));
        command.addAll(List.of("-var_stream_map", varStringMapArg));
        command.addAll(List.of("-master_pl_name", "master.m3u8", "-hls_segment_filename", outputPath + "/%v/%03d.ts",
                outputPath + "/%v/index.m3u8"));
        return command;
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
