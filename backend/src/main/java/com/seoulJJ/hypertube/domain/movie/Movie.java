package com.seoulJJ.hypertube.domain.movie;

import java.util.List;

import com.seoulJJ.hypertube.domain.movie.dto.MovieDownDto;
import com.seoulJJ.hypertube.domain.movie.type.MovieState;
import com.seoulJJ.hypertube.domain.user.userMovie.UserMovie;
import com.seoulJJ.hypertube.global.utils.BaseTimeEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "movie", indexes = {
        @Index(columnList = "imdb_id", unique = true),
        @Index(columnList = "torrent_hash", unique = true) })
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Movie extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "imdb_id", unique = true, nullable = false)
    private String imdbId;

    @Column(name = "torrent_hash", unique = true)
    private String torrentHash;

    @Column(name = "hls_playlist_path")
    private String hlsPlaylistPath;

    @Column(name = "state")
    @Enumerated(value = jakarta.persistence.EnumType.STRING)
    private MovieState movieState;

    public Movie(MovieDownDto movieDownDto) {
        this.imdbId = movieDownDto.getImdbId();
        this.torrentHash = movieDownDto.getTorrentHash();
        this.movieState = MovieState.NO_FILE;
    }

    @OneToMany(mappedBy = "movie", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserMovie> userMovies;

    public void setMovieState(MovieState movieState) {
        this.movieState = movieState;
    }

    public void setHlsPlaylistPath(String hlsPlaylistPath) {
        this.hlsPlaylistPath = hlsPlaylistPath;
    }
}
