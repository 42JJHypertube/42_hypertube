package com.seoulJJ.hypertube.domain.user;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seoulJJ.hypertube.domain.movie.dto.MovieDto;
import com.seoulJJ.hypertube.domain.user.dto.ModifyNicknameReqDto;
import com.seoulJJ.hypertube.domain.user.dto.RecentWatchedMoviesResDto;
import com.seoulJJ.hypertube.domain.user.dto.UserDto;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.utils.argumentresolver.LoginPrincipal;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @Value("${spring.file_path.profile_image}")
    private String profileImagePath;

    @GetMapping("/me")
    public UserDto getUserDetail(@Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal) {
        return userService.findUserDetailByEmail(userPrincipal.getUsername());
    }

    @PostMapping("/me/profile-image")
    public ResponseEntity<String> updateProfileImage(
            @Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal,
            @RequestPart MultipartFile file) {
        userService.updateUserProfileImage(userPrincipal.getUsername(), file);
        return ResponseEntity.status(201).body("Success");
    }

    @PutMapping("/me/nickname")
    public ResponseEntity<String> putMethodName(@Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal,
            @RequestBody ModifyNicknameReqDto modifyNicknameReqDto) {
        userService.modifyNickname(userPrincipal, modifyNicknameReqDto.getNickname());
        return ResponseEntity.status(201).body("Success");
    }

    @GetMapping("/me/movies/watched")
    public ResponseEntity<RecentWatchedMoviesResDto> getRecentWatchedMovies(
            @Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal) {
        List<MovieDto> movieDtos = userService.findRecentWatchedMovies(userPrincipal);
        RecentWatchedMoviesResDto res = new RecentWatchedMoviesResDto(movieDtos);
        return ResponseEntity.ok(res);
    }
}
