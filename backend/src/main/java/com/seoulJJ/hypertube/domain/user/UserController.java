package com.seoulJJ.hypertube.domain.user;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.seoulJJ.hypertube.domain.user.dto.UserDto;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.utils.argumentresolver.LoginPrincipal;

import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Log4j2
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
    public String updateProfileImage(@Parameter(hidden = true) @LoginPrincipal UserPrincipal userPrincipal, MultipartFile file) {
        userService.updateUserProfileImage(userPrincipal.getUsername(), file);
        return "good";
    }
    

    @GetMapping("/test/role-user")
    public String roleUserTest() {
        return "Success! You are authorized user!";
    }

    @GetMapping("/test/role-admin")
    public String roleAdminTest() {
        return "Success! You are authorized admin!";
    }

}
