package com.seoulJJ.hypertube.global.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class SwaggerConfig {

    @Value("${springdoc.api-definition}")
    private String apiDefinition;

    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .version("v1.0.0")
                .title("Hypertube API")
                .description("Swagger API for Hypertube");

        return new OpenAPI()
                .info(info)
                .servers(Arrays.asList(new Server().url(apiDefinition).description("Local Server")));
    }
}