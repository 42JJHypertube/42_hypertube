package com.seoulJJ.hypertube.global.security.auth.RedisEmailToken;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(value = "emailToken", timeToLive = 60 * 60 * 24 * 3)
public class EmailToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailToken;

    @Indexed
    private String email;

    public EmailToken(String email, String emailToken) {
        this.email = email;
        this.emailToken = emailToken;
    }
}