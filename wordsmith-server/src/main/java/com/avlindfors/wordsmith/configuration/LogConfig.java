package com.avlindfors.wordsmith.configuration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.zalando.logbook.HttpLogFormatter;
import org.zalando.logbook.json.JsonHttpLogFormatter;

@Configuration
public class LogConfig {

  /**
   * Enable indented JSON log formatting.
   */
  @Bean
  public HttpLogFormatter jsonFormatter() {
    ObjectMapper mapper = new ObjectMapper();
    mapper.enable(SerializationFeature.INDENT_OUTPUT);
    return new JsonHttpLogFormatter(mapper);
  }

}
