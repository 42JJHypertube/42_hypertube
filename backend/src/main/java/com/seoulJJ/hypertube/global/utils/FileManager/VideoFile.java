package com.seoulJJ.hypertube.global.utils.FileManager;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.file.Path;
import java.util.List;

import lombok.Getter;

@Getter
public class VideoFile extends File {

    private Integer width;
    private Integer height;
    private Double duration;
    private Long bitRate;
    private String codecName;

    // 생성자
    public VideoFile(String pathname) {
        super(pathname);
        ffprob();
    }

    public VideoFile(String parent, String child) {
        super(parent, child);
        ffprob();
    }

    public VideoFile(File parent, String child) {
        super(parent, child);
        ffprob();
    }

    public VideoFile(File file) {
        super(file.getAbsolutePath());
        ffprob();
    }

    public VideoFile(Path filePath) {
        super(filePath.toString());
        ffprob();
    }
    // public
    public String getNameWithoutExtension() {
        String fileName = this.getName();

        int lastDotIndex = fileName.lastIndexOf('.');
        if (lastDotIndex != -1) {
            return fileName.substring(0, lastDotIndex);
        }
        return fileName;
    }

    public String getResolution() {
        return height + "p";
    }

    public String toString() {
        return "VideoFile [width=" + width + ", height=" + height + ", duration=" + duration + ", bitRate=" + bitRate
        + ", codecName=" + codecName + "]";
    }
    
    // private
    private void ffprob() {
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
                this.getPath()
            );
    
            // FFprobe 명령을 포함한 ProcessBuilder 생성
            ProcessBuilder processBuilder = new ProcessBuilder(command);
            System.out.println("FFmpeg 실행 명령어: " + String.join(" ", command));
    
            // 프로세스 실행 및 출력 가져오기
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
    
            // 출력 읽기
            String line;
            StringBuilder output = new StringBuilder();
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
    
            // 프로세스 종료 및 출력 확인
            int exitVal = process.waitFor();
            if (exitVal == 0) {
                System.out.println("Command executed successfully!");
                System.out.println("Output:\n" + output.toString());
    
                // 화질 정보 파싱
                String[] lines = output.toString().split("\n");
                for (String l : lines) {
                    String[] parts = l.split("=");
                    String key = parts[0].trim();
                    String value = parts[1].trim();
                    if (key.equals("width")) {
                        this.width = Integer.valueOf(value);
                    } else if (key.equals("height"))
                        this.height = Integer.valueOf(value);
                    else if (key.equals("duration"))
                        this.duration = Double.valueOf(value);
                    else if (key.equals("bit_rate"))
                        this.bitRate = Long.valueOf(value);
                    else if (key.equals("codec_name"))
                        this.codecName = value;
                }
            } else {
                // 명령어 실행 중 오류 발생
                System.err.println("Error executing command!");
                System.err.println("Output:\n" + output.toString());
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}
