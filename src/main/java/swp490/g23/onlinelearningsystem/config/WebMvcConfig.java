package swp490.g23.onlinelearningsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Bean
    public WebMvcConfigurer configurer (){
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")	
                        .allowedHeaders("GET","POST","PUT","DELETE","OPTION")
                        .allowedMethods("*")
                        .allowedOriginPatterns("*")
                        ;
            }
        };
    }
}
