package swp490.g23.onlinelearningsystem.util;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;

@Component
public class DbInit {
 
    @Autowired
    private UserRepository userRepository;
 
    @PostConstruct // Create User on app startup
    private void postConstruct() {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User defaultUser = new User("xucxichbo@doivl.com", encoder.encode("123456"));
        userRepository.save(defaultUser);
    }
}