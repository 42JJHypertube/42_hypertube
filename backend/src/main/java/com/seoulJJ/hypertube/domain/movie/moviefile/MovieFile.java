package com.seoulJJ.hypertube.domain.movie.moviefile;

import com.seoulJJ.hypertube.domain.movie.Movie;

import jakarta.annotation.Generated;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class MovieFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "movie_id")
    private Movie movie;

    // 폴더 경로
    @Column(name = "dir_path")
    private String dirPath;

    // hls 마스터플레이리스트 경로
    @Column(name = "hls_playlist_path")
    private String hlsPlaylistPath;

    // 파일 사이즈
    @Column(name = "size_byte")
    private String fileSize;
}
