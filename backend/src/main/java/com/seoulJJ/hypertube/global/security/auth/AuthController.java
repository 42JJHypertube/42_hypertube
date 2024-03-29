package com.seoulJJ.hypertube.global.security.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.seoulJJ.hypertube.domain.user.UserService;
import com.seoulJJ.hypertube.domain.user.dto.CreateUserDto;
import com.seoulJJ.hypertube.global.exception.ErrorCode;
import com.seoulJJ.hypertube.global.exception.custom.InvalidParameterException;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthAccessTokenRequestDto;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthEmailCheckResponseDto;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthEmailTokenDto;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthModifyPasswordRequestDto;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthSendCodeRequestDto;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthSignInDto;
import com.seoulJJ.hypertube.global.security.auth.exception.AuthTokenCookieNotFoundException;
import com.seoulJJ.hypertube.global.security.auth.exception.AuthVerifyEmailTokenFailedException;
import com.seoulJJ.hypertube.global.security.cookie.CookieUtil;
import com.seoulJJ.hypertube.global.security.jwt.JwtTokenProvider;
import com.seoulJJ.hypertube.global.security.jwt.dto.JwtTokenDto;
import com.seoulJJ.hypertube.global.utils.SnsMailSender;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private final UserService userService;
    @Autowired
    private final AuthService authService;
    @Autowired
    private final SnsMailSender snsMailSender;
    @Autowired
    private final CookieUtil cookieUtil;
    @Autowired
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("email-check")
    public AuthEmailCheckResponseDto checkEmail(@RequestParam String email) {
        boolean isEmailExist = userService.isEmailExist(email);
        boolean isPasswordExist = userService.isPasswordExist(email);
        return new AuthEmailCheckResponseDto(isEmailExist, isPasswordExist);
    }

    @PostMapping("/2fa/send-code")
    public ResponseEntity<String> sendMailCheckCode(@Valid @RequestBody AuthSendCodeRequestDto requestDto) {
        String code = authService.createCode(requestDto.getEmail());
        snsMailSender.send2FACode(requestDto.getEmail(), code);
        return ResponseEntity.ok("Send Code Success!" + code);
    }

    @GetMapping("/2fa/verify-code")
    public ResponseEntity<AuthEmailTokenDto> verifyCode(@Param("email") String email, @Param("code") String code) {
        authService.verifyCode(email, code);
        String emailToken = jwtTokenProvider.generateEmailToken(email);
        return ResponseEntity.ok(new AuthEmailTokenDto(emailToken));
    }

    @PostMapping("modify-password")
    public ResponseEntity<String> postMethodName(@RequestBody AuthModifyPasswordRequestDto requestDto) {
        if (!requestDto.getPassword().equals(requestDto.getPassword2()))
            throw new InvalidParameterException("비밀번호가 일치하지 않습니다.", ErrorCode.VALID_FAILED);
        if (!jwtTokenProvider.validateToken(requestDto.getEmailToken()))
            throw new AuthVerifyEmailTokenFailedException();

        String email = jwtTokenProvider.getEmailFromEmailToken(requestDto.getEmailToken());
        userService.modifyPassword(email, requestDto.getPassword());

        return ResponseEntity.ok("비밀번호 변경 성공!");
    }

    @PostMapping("/access-token")
    public JwtTokenDto gerateAccessToken(HttpServletRequest request, HttpServletResponse response) {
        String accessToken = cookieUtil.getCookie(request, "access_token")
                .orElseThrow(() -> new AuthTokenCookieNotFoundException()).getValue();
        String refreshToken = cookieUtil.getCookie(request, "refresh_token")
                .orElseThrow(() -> new AuthTokenCookieNotFoundException()).getValue();
        AuthAccessTokenRequestDto dto = new AuthAccessTokenRequestDto(accessToken, refreshToken);

        JwtTokenDto jwtToken = authService.regenerateToken(dto);
        cookieUtil.addJwtTokenCookie(response, jwtToken);
        return jwtToken;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<String> createUser(@Valid @RequestBody CreateUserDto createUserDto) {

        if (!createUserDto.getPassword().equals(createUserDto.getPassword2()))
            throw new InvalidParameterException("비밀번호가 일치하지 않습니다.", ErrorCode.VALID_FAILED);
        if (!jwtTokenProvider.validateToken(createUserDto.getEmailToken()))
            throw new AuthVerifyEmailTokenFailedException();

        userService.createUser(createUserDto);

        return ResponseEntity.ok("회원가입 성공!");
    }

    @PostMapping("/sign-in/password")
    public JwtTokenDto signInWithPassword(@RequestBody AuthSignInDto signInDto, HttpServletResponse response) {
        String email = signInDto.getEmail();
        String password = signInDto.getPassword();

        JwtTokenDto jwtToken = authService.signInWithPassword(email, password);
        cookieUtil.addJwtTokenCookie(response, jwtToken);
        return jwtToken;
    }

    @PostMapping("/sign-in/email-token")
    public JwtTokenDto signInWithEmailToken(@RequestBody AuthSignInDto signInDto, HttpServletResponse response) {
        String email = signInDto.getEmail();
        String emailToken = signInDto.getEmailToken();

        JwtTokenDto jwtToken = authService.signInWithEmailToken(email, emailToken);
        cookieUtil.addJwtTokenCookie(response, jwtToken);
        return jwtToken;
    }
}