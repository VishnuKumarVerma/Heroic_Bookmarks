package org.project.heroicbookmarksbackend;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.core.env.MapPropertySource;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
public class HeroicBookmarksBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(HeroicBookmarksBackendApplication.class, args);
    }
}
