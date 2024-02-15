package com.seoulJJ.hypertube;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(servers = {@Server(url = "https://localhost", description = "Local Server")})
@SpringBootApplication
public class HypertubeApplication {

	public static void main(String[] args) {
		SpringApplication.run(HypertubeApplication.class, args);
	}

}
