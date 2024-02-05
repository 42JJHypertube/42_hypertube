package com.seoulJJ.hypertube.domain.user;

import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.user.dto.CreateUserDto;
import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.InvalidParameterException;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserService userService;

    @GetMapping("/test")
    public String userTest() {
        return "Test Success!";
    }
    
    @PostMapping
    public String createUser(@RequestBody CreateUserDto createUserDto) {

        if (!createUserDto.getPassword().equals(createUserDto.getPassword2()))
            throw new InvalidParameterException("비밀번호가 일치하지 않습니다.", ErrorCode.VALID_FAILED);
        
        userService.createUser(createUserDto);
        return createUserDto.toString();
    }
}