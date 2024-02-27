package com.seoulJJ.hypertube.domain.user;

import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.user.dto.UserDto;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.utils.argumentresolver.LoginPrincipal;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/me")
    public UserDto getUserDetail(@LoginPrincipal UserPrincipal userPrincipal) {
        return userService.findUserDetailByEmail(userPrincipal.getUsername());
    }

    @GetMapping("/test")
    public String userTest() {
        return "Test Success!";
    }
}
