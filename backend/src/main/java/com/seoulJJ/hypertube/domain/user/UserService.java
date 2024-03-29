package com.seoulJJ.hypertube.domain.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.seoulJJ.hypertube.domain.user.dto.CreateUserDto;
import com.seoulJJ.hypertube.domain.user.dto.UserDto;
import com.seoulJJ.hypertube.domain.user.exception.UserNotFoundException;
import com.seoulJJ.hypertube.domain.user.type.RoleType;
import com.seoulJJ.hypertube.global.utils.FileManager.ImageFileManager;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final ImageFileManager imageFileManager;

    @Transactional
    public User createUser(CreateUserDto createUserDto) {
        User user = new User(
                createUserDto.getNickname(),
                createUserDto.getEmail(),
                passwordEncoder.encode(createUserDto.getPassword()),
                createUserDto.getFirstName(),
                createUserDto.getLastName(),
                null,
                RoleType.USER);
        return userRepository.save(user);
    }

    @Transactional
    public void updateUserProfileImage(String email, MultipartFile file) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        imageFileManager.updateUserProfileImage(file, user.getEmail());
    }

    @Transactional(readOnly = true)
    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
    }

    @Transactional(readOnly = true)
    public UserDto findUserDetailByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        return new UserDto(user.getNickname(), user.getEmail(), user.getFirstName(), user.getLastName(), user.getImageUrl(), user.getRoleType());
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

    @Transactional
    public void modifyPassword(String email, String password)
    {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        user.updatePassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }
}
