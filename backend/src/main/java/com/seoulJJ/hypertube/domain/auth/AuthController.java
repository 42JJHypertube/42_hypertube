package com.seoulJJ.hypertube.domain.auth;

import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.auth.dto.AuthSendCodeRequestDto;
import com.seoulJJ.hypertube.global.utils.SnsMailSender;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final SnsMailSender snsMailSender;

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
}