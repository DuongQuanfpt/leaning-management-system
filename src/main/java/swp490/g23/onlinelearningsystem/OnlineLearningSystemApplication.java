package swp490.g23.onlinelearningsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;


@SpringBootApplication
public class OnlineLearningSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineLearningSystemApplication.class, args);

		User user = new User(); //create default user
		user.setEmail("xucxichbo@doivl.com");
		user.setPassword("123456");
	}

}
