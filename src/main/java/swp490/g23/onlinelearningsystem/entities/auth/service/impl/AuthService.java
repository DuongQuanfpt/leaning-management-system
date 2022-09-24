package swp490.g23.onlinelearningsystem.entities.auth.service.impl;

import java.io.UnsupportedEncodingException;

import javax.mail.MessagingException;

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

import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.auth.domain.request.AuthRequest;
import swp490.g23.onlinelearningsystem.entities.auth.domain.response.AuthResponse;
import swp490.g23.onlinelearningsystem.entities.auth.service.IAuthService;
import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.impl.EmailService;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;
import swp490.g23.onlinelearningsystem.util.EnumEntity.RoleEnum;
import swp490.g23.onlinelearningsystem.util.EnumEntity.UserStatusEnum;

@Service
public class AuthService implements IAuthService {

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    JwtTokenUtil tokenUtil;

    public static final String ADMIN = "ROLE_ADMIN";
    public static final String TRAINEE = "ROLE_TRAINEE";

    @Override
    public ResponseEntity<?> authenticate(AuthRequest request) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            User user = (User) authentication.getPrincipal();
            String accessToken = tokenUtil.generateAccessToken(user);
            AuthResponse response = new AuthResponse(user.getEmail(), accessToken, user.getFullName());
            return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorect credentials");
        }

    }

    @Override
    public ResponseEntity<?> register(AuthRequest request, String password) {
        if (userRepository.findOneByEmail(request.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exist");
        }

        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(password));
        user.addRole(settingRepositories.findBySettingValue(RoleEnum.ROLE_TRAINEE.toString()));
        user.setStatus(UserStatusEnum.INACTIVE);
        user.setMailToken( RandomString.make(30));
        userRepository.save(user);
        try {
            String verifyUrl = "https://lms-app-1.herokuapp.com/auth/verify?token="+user.getMailToken();
            sendRegisterMail(request.getEmail(), verifyUrl, password);
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok("Successfull register , password has been to your email");
    }

    
    @Override
    public ResponseEntity<?> verifyUser(String token) {
        User user = userRepository.findByMailToken(token);
       
        if(user == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesnt exist");
        }
        System.out.print(user.getEmail());
        user.setStatus(UserStatusEnum.ACTIVE);
        user.setMailToken(null);
        userRepository.save(user);
        return ResponseEntity.ok().body(user.getFullName()+ " has been verified");
    }

    public void sendRegisterMail(String email, String verifyUrl, String password) throws UnsupportedEncodingException, MessagingException  {

        EmailDetails details = new EmailDetails();

        details.setRecipient(email);

        String subject = "Register sucessfull";

        String content = "<p>Hello,</p>"
                + "<p>Your account have been sucessfully created, here your password : " + password + ".</p>"
                + "<p>For the final step , click the link below to activate your account :</p>"
                + "<p><a href=\"" + verifyUrl + "\">Click to verify your account  </a></p>"
                + "<br>";

        details.setMsgBody(content);
        details.setSubject(subject);

        emailService.sendMimeMail(details);
    }


}
