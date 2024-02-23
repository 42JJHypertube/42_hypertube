package com.seoulJJ.hypertube.domain.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.seoulJJ.hypertube.domain.user.dto.CreateUserDto;
import com.seoulJJ.hypertube.domain.user.exception.UserNotFoundException;
import com.seoulJJ.hypertube.domain.user.type.RoleType;
import com.seoulJJ.hypertube.global.security.auth.dto.AuthEmailCheckResponseDto;

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
                RoleType.USER);
        return userRepository.save(user);
    }

    @Transactional
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
    }

    @Transactional(readOnly = true)
    public boolean isEmailExist(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return false;
        }

        return true;
    }

    @Transactional(readOnly = true)
    public boolean isPasswordExist(String email) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return false;
        }

        if (user.getPassword() == null) {
            return false;
        }

        return true;
    }
}
