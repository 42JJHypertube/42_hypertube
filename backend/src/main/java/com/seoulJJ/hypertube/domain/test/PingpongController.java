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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PingpongController {

    private final VideoFileManager videoConverter;

    @GetMapping
    public String pingpong() {
        return "Ping PONG!";
    }

    @GetMapping("/permit")
    public String getMethodName() {
        return "permit!";
    }
    
}
