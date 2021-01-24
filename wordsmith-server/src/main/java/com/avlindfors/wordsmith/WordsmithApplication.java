package com.avlindfors.wordsmith;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
@EnableAutoConfiguration
public class WordsmithApplication {

	public static void main(String[] args) {
		SpringApplication.run(WordsmithApplication.class, args);
	}

}
