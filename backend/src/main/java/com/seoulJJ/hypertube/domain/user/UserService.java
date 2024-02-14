package com.seoulJJ.hypertube.domain.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.user.dto.CreateUserDto;
import com.seoulJJ.hypertube.domain.user.type.RoleType;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User createUser(CreateUserDto createUserDto) {
        User user = new User(
            createUserDto.getNickname(),
            createUserDto.getEmail(),
            passwordEncoder.encode(createUserDto.getPassword()),
            createUserDto.getFirstName(),
            createUserDto.getLastName(),
            createUserDto.getImageUrl(),
            RoleType.USER
        );
        return userRepository.save(user);
    }

    @Transactional
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }
}
