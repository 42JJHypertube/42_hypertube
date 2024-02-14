package com.seoulJJ.hypertube.global.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.seoulJJ.hypertube.global.security.jwt.JwtAuthenticationFilter;
import com.seoulJJ.hypertube.global.security.jwt.JwtTokenProvider;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtTokenProvider jwtTokenProvider;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
				// .httpBasic((httpBasicConfig) -> httpBasicConfig.disable())
				.csrf((csrfConfig) -> csrfConfig.disable())
				.sessionManagement(
						(sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.headers(
						(headerConfig) -> headerConfig.frameOptions(frameOptionsConfig -> frameOptionsConfig.disable()));

		http
				.authorizeHttpRequests((authorizeRequests) -> authorizeRequests
						.requestMatchers("/api/docs", "/api/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html")
						.permitAll() // swagger
						.requestMatchers("/api/auth/user/test").hasRole("USER")
						.requestMatchers("/api/auth/admin/test").hasRole("ADMIN")
						.requestMatchers("/api/**").permitAll() // 전체 api 허용
						.anyRequest().authenticated());

		http
			.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}