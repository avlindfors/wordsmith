package com.avlindfors.wordsmith.configuration;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CorsConfig implements WebMvcConfigurer {

  private static final Logger log = LoggerFactory.getLogger(CorsConfig.class);

  @Value("${wordsmith.cors.allow.origin}")
  private String[] allowedOrigins;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    if (allowedOrigins.length != 0) {
      registry.addMapping("/api/**")
          .allowedOrigins(allowedOrigins);
      log.info("Setting allowed origins: {}", Arrays.asList(allowedOrigins));
    } else {
      log.info("Using default allowed origins");
    }
  }
}
