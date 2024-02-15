package com.seoulJJ.hypertube.global.security.auth;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.user.User;
import com.seoulJJ.hypertube.domain.user.UserService;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthSendCodeRequestDto;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthSignInDto;
import com.seoulJJ.hypertube.global.security.jwt.dto.JwtTokenDto;
import com.seoulJJ.hypertube.global.utils.SnsMailSender;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.RequestParam;


@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final SnsMailSender snsMailSender;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/2fa/signup/send-code")
    public ResponseEntity<String> sendMailCheckCode(@Valid @RequestBody AuthSendCodeRequestDto requestDto) {
        String code = authService.createCode(requestDto.getEmail());
        snsMailSender.send2FACode(requestDto.getEmail(), code);
        return ResponseEntity.ok("Send Code Success!" + code);
    }

    @GetMapping("/2fa/signup/verify-code")
    public ResponseEntity<String> verifyCode(@Param("email") String email, @Param("code") String code) {
        authService.verifyCode(email, code);
        String token = authService.generateSignupToken(email);
        return ResponseEntity.ok(token);
    }

    @PostMapping("/sign-in")
    public JwtTokenDto signIn(@RequestBody AuthSignInDto signInDto) {
        String email = signInDto.getEmail();
        String password = signInDto.getPassword();

        authService.signIn(email, password);
        JwtTokenDto jwtToken = authService.signIn(email, password);
        return jwtToken;
    }

    @GetMapping("/user/test")
    public String userAuthorizationTest() {
        return "Success! You are authorized user!";
    }

    @GetMapping("/admin/test")
    public String adminAuthorizationTest() {
        return "Success! You are authorized admin!";
    }
    
    
}