package swp490.g23.onlinelearningsystem.entities.auth.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.auth.domain.request.AuthRequest;
import swp490.g23.onlinelearningsystem.entities.auth.domain.response.AuthResponse;
import swp490.g23.onlinelearningsystem.entities.auth.service.IAuthService;
import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.impl.EmailService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;

@Service
public class AuthService implements IAuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired 
    private EmailService emailService;

    @Autowired
    JwtTokenUtil tokenUtil;
    
    @Override
    public ResponseEntity<?> authenticate( AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            User user = (User) authentication.getPrincipal();
            String accessToken = tokenUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getEmail(), accessToken , user.getFullName());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
      
    }

    @Override 
    public ResponseEntity<?> register(AuthRequest request, String password) {
        if(userRepository.findOneByEmail(request.getEmail())!=null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exist");
        }
        
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(password));

        userRepository.save(user);
        EmailDetails details = new EmailDetails();
       
        details.setRecipient(request.getEmail());
        details.setMsgBody("Generated password is "+password);
        details.setSubject("Register");
        emailService.sendSimpleMail(details);
        
        return ResponseEntity.ok(user.getPassword());
    }
    
}