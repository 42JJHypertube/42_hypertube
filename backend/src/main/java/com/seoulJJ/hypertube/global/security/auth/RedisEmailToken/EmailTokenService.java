package com.seoulJJ.hypertube.global.security.auth.RedisEmailToken;

import org.springframework.lang.NonNull;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.seoulJJ.hypertube.global.security.auth.exception.AuthVerifyEmailTokenFailedException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailTokenService {
    private final EmailTokenRepository emailTokenRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void saveTokenInfo(String email, String emailToken) {
        String encryptedEmailToken = passwordEncoder.encode(emailToken);
        emailTokenRepository.save(new EmailToken(email, encryptedEmailToken));
    }

    public void verifyEmailToken(@NonNull String token, @NonNull String email) {
        EmailToken encryptedEmailToken = emailTokenRepository.findByEmail(email).orElseThrow(() -> new AuthVerifyEmailTokenFailedException());
        if (!passwordEncoder.matches(token, encryptedEmailToken.getEmailToken())) {
            throw new AuthVerifyEmailTokenFailedException();
        }
    }
}
