package com.seoulJJ.hypertube.domain.user;

import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.seoulJJ.hypertube.domain.user.userMovie.UserMovie;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    @Query("SELECT um FROM UserMovie um WHERE um.user.id = :userId ORDER BY um.watchedAt DESC")
    List<UserMovie> findRecentWatchedMoviesOrderByWatchedAtDesc(Long userId);

    @Query(value = "SELECT um FROM UserMovie um WHERE um.user.id = :userId AND um.movie.id = :movieId")
    Optional<UserMovie> findUserMovieByUserIdAndMovieId(@Param("userId") Long userId,
            @Param("movieId") Long movieId);
}
