package com.seoulJJ.hypertube.domain.user;

import java.util.List;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.seoulJJ.hypertube.domain.movie.Movie;
import com.seoulJJ.hypertube.domain.movie.MovieRepository;
import com.seoulJJ.hypertube.domain.movie.dto.MovieDto;
import com.seoulJJ.hypertube.domain.movie.exception.MovieNotFoundException;
import com.seoulJJ.hypertube.domain.user.dto.CreateUserDto;
import com.seoulJJ.hypertube.domain.user.dto.UserDto;
import com.seoulJJ.hypertube.domain.user.exception.UserNotFoundException;
import com.seoulJJ.hypertube.domain.user.type.RoleType;
import com.seoulJJ.hypertube.domain.user.userMovie.UserMovie;
import com.seoulJJ.hypertube.global.security.UserPrincipal;
import com.seoulJJ.hypertube.global.utils.FileManager.ImageFileManager;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final MovieRepository movieRepository;

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
        return new UserDto(user.getNickname(), user.getEmail(), user.getFirstName(), user.getLastName(),
                user.getImageUrl(), user.getRoleType());
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
    public void modifyNickname(UserPrincipal userPrincipal, String nickname) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new UserNotFoundException());
        user.updateNickname(nickname);
        userRepository.save(user);
    }

    @Transactional
    public void modifyPassword(String email, String password) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException());
        user.updatePassword(passwordEncoder.encode(password));
        userRepository.save(user);
    }

    @Transactional
    public List<MovieDto> findRecentWatchedMovies(UserPrincipal userPrincipal) {
        Long userId = userPrincipal.getId();
        System.out.println("userId: " + userId);
        List<UserMovie> userMovies = userRepository.findRecentWatchedMoviesOrderByWatchedAtDesc(userId);
        System.out.println("userMovies: " + userMovies);

        List<MovieDto> movieDtos = new ArrayList<>();
        for (UserMovie userMovie : userMovies) {
            movieDtos.add(MovieDto.from(userMovie.getMovie()));
        }
        return movieDtos;
    }

    @Transactional
    public void updateRecentWatchedMovies(UserPrincipal userPrincipal, MovieDto movieDto) {
        User user = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new UserNotFoundException());
        UserMovie userMovie = userRepository.findUserMovieByUserIdAndMovieId(userPrincipal.getId(), movieDto.getId())
                .orElse(null);
        if (userMovie == null) {
            Movie movie = movieRepository.findById(movieDto.getId())
                    .orElseThrow(() -> new MovieNotFoundException());
            userMovie = new UserMovie(user, movie);
        }
        userMovie.updateWatchedAtToNow();
        user.addUserMovie(userMovie);
        userRepository.save(user);
        return;
    }
}
