package com.seoulJJ.hypertube.domain.movie_subtitle;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubtitleRepository extends JpaRepository<Subtitle, Long> {

    Optional<Subtitle> findByOpenSubtitleId(Long openSubtitleId);
}
