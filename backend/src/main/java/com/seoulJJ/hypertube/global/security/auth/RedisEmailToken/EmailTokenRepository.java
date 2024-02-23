package com.seoulJJ.hypertube.global.security.auth.RedisEmailToken;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailTokenRepository extends CrudRepository<EmailToken,String> {
    Optional<EmailToken> findByEmail(String email); 
}