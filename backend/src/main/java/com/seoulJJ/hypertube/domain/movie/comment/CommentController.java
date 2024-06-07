package com.seoulJJ.hypertube.domain.movie.comment;

import java.util.List;

import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.movie.comment.dto.CommentDto;
import com.seoulJJ.hypertube.domain.movie.comment.dto.CreateCommentReqDto;
import com.seoulJJ.hypertube.domain.movie.comment.dto.UpdateCommentReqDto;
import com.seoulJJ.hypertube.domain.movie.dto.MovieCommentsResDto;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.utils.argumentresolver.LoginPrincipal;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private final CommentService commentService;

    @GetMapping("/movies/{movieId}")
    public ResponseEntity<?> getMovieComments(@PathVariable Long movieId) {
        List<CommentDto> commentDtos = commentService.findCommentsByMovieId(movieId);
        MovieCommentsResDto resDto = new MovieCommentsResDto(commentDtos);
        return ResponseEntity.ok(resDto);
    }

    @PostMapping("/movies/{movieId}")
    public ResponseEntity<String> postMovieComment(
            @Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal,
            @PathVariable Long movieId, @RequestBody CreateCommentReqDto reqDto) {
        commentService.createComment(userPrincipal.getId(), movieId, reqDto.getContent());
        return ResponseEntity.ok("Success");
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<String> putComment(@Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal,
            @RequestBody UpdateCommentReqDto reqDto,
            @PathVariable Long commentId) {
        commentService.updateComment(userPrincipal, commentId, reqDto.getContent());
        return ResponseEntity.ok("Success");
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal,
            @PathVariable Long commentId) {
        commentService.deleteComment(userPrincipal, commentId);
        return ResponseEntity.ok("Success");
    }
}
