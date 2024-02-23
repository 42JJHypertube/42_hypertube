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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.seoulJJ.hypertube.global.security.handler.OAuthAuthenticationSuccessHandler;
import com.seoulJJ.hypertube.global.security.jwt.ExceptionHandlerFilter;
import com.seoulJJ.hypertube.global.security.jwt.JwtAuthenticationFilter;
import com.seoulJJ.hypertube.global.security.jwt.JwtTokenProvider;
import com.seoulJJ.hypertube.global.security.service.CustomOAuth2UserService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtTokenProvider jwtTokenProvider;

	private final CustomOAuth2UserService customOAuth2UserService;

	private final OAuthAuthenticationSuccessHandler oAuthAuthenticationSuccessHandler;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
				.httpBasic((httpBasicConfig) -> httpBasicConfig.disable())
				.cors((corsConfig) -> corsConfig.configurationSource(corsConfigurationSource()))
				.csrf((csrfConfig) -> csrfConfig.disable())
				.sessionManagement(
						(sessionManagement) -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.headers(
						(headerConfig) -> headerConfig
								.frameOptions(frameOptionsConfig -> frameOptionsConfig.disable()));

		http
				.authorizeHttpRequests((authorizeRequests) -> authorizeRequests
						.requestMatchers("/api/docs", "/api/swagger-ui/**", "/v3/api-docs/**", "/swagger-ui.html")
						.permitAll() // swagger
						.requestMatchers("/", "/index.html").permitAll() // permit access to the root path
						.requestMatchers("/api/auth/user/test").hasRole("USER")
						.requestMatchers("/api/auth/admin/test").hasRole("ADMIN")
						.requestMatchers("/api/**").permitAll() // 전체 api 허용
						.anyRequest().authenticated());

		http
				.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider),
						UsernamePasswordAuthenticationFilter.class)
				.addFilterBefore(new ExceptionHandlerFilter(),
						JwtAuthenticationFilter.class);

		http
				.oauth2Login((oauth2Login) -> oauth2Login
						.authorizationEndpoint(endpoint -> endpoint.baseUri("/api/auth/oauth2/login"))
						.redirectionEndpoint(endpoint -> endpoint.baseUri("/api/auth/oauth2/code/*"))
						.userInfoEndpoint((userInfoEndpoint) -> userInfoEndpoint
								.userService(customOAuth2UserService))
								.successHandler(oAuthAuthenticationSuccessHandler));
								// .failureHandler(null));

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.addAllowedOrigin("https://localhost");
		configuration.addAllowedOrigin("http://localhost:3000");
		configuration.addAllowedMethod("GET");
		configuration.addAllowedMethod("POST");
		configuration.addAllowedMethod("DELETE");
		configuration.addAllowedMethod("PUT");
		configuration.addAllowedMethod("PATCH");
		configuration.addAllowedHeader("*");
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}