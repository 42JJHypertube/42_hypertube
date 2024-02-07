package com.seoulJJ.hypertube.global.utils;

import java.util.Random;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Component
@AllArgsConstructor
public class SnsMailSender {

    private final JavaMailSender mailSender;

    public String send2FACode(String to, String code) {

        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject("Hyertube 인증 코드");
            message.setText("인증코드 : " + code);
            mailSender.send(message);
            return code;
        } catch (Exception e) {
            log.error("Send 2FA Code Fail!", e);
        }

        return null;
    }
}