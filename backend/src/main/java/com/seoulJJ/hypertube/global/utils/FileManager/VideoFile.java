package com.seoulJJ.hypertube.global.utils.FileManager;

import java.io.File;
import java.nio.file.Path;

import com.seoulJJ.hypertube.global.utils.FFmpeg;

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
        FFmpeg fFmpeg = new FFmpeg();

        String output = fFmpeg.getVideoInfo(this.getPath());
        System.out.println("Command executed successfully!");
        System.out.println("Output:\n" + output);

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
                try {
                    this.duration = Double.valueOf(value);
                } catch (NumberFormatException e) {
                    this.duration = null;
                }
            else if (key.equals("bit_rate")) {
                try {
                    this.bitRate = Long.valueOf(value);
                } catch (NumberFormatException e) {
                    this.bitRate = null;
                }
            } else if (key.equals("codec_name"))
                this.codecName = value;
        }
    }
}
