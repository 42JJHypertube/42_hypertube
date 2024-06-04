package com.seoulJJ.hypertube.domain.movie.comment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private final CommentService commentService;

    @GetMapping()
    public String getMethodName(@RequestParam String param) {
        return new String();
    }
    
}
