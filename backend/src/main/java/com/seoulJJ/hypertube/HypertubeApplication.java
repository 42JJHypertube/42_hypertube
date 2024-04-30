package com.seoulJJ.hypertube;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.log4j.Log4j2;

@Log4j2
@SpringBootApplication
public class HypertubeApplication {

	public static void main(String[] args) {
		SpringApplication.run(HypertubeApplication.class, args);
	}

}
