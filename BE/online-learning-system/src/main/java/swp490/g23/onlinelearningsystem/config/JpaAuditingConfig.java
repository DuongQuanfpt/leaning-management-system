package swp490.g23.onlinelearningsystem.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import swp490.g23.onlinelearningsystem.util.AuditorAwareImpl;


@Configuration
@EnableJpaAuditing
public class JpaAuditingConfig {
   
        @Bean
        public AuditorAware<String> auditorAware() {
            return new AuditorAwareImpl();
        }

}
