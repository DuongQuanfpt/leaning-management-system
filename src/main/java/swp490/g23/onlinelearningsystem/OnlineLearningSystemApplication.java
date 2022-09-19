package swp490.g23.onlinelearningsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class OnlineLearningSystemApplication {

	@Bean
	public WebMvcConfigurer mvcConfigurer(){//Enable CORS
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
              registry.addMapping("/*").allowedOriginPatterns("http://localhost:3000/");
            }
        };
    }

	public static void main(String[] args) {
		SpringApplication.run(OnlineLearningSystemApplication.class, args);

	}

}
