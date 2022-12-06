package swp490.g23.onlinelearningsystem.entities.auth.service.impl;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.util.List;

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

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;

// import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
// import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;

import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.auth.domain.request.AuthRequest;
import swp490.g23.onlinelearningsystem.entities.auth.domain.request.GoogleAuthRequest;
import swp490.g23.onlinelearningsystem.entities.auth.domain.response.AuthResponse;
import swp490.g23.onlinelearningsystem.entities.auth.service.IAuthService;
import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.impl.EmailService;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.enums.UserStatus;
import swp490.g23.onlinelearningsystem.enums.EnumEntity.RoleEnum;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.InvalidTokenException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.UnverifiedUserException;
import swp490.g23.onlinelearningsystem.util.GoogleHelper;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;
import swp490.g23.onlinelearningsystem.util.StringUltility;

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

    private GoogleHelper googleHelper = new GoogleHelper();

    @Autowired
    JwtTokenUtil tokenUtil;

    public static final String ADMIN = "ROLE_ADMIN";
    public static final String TRAINEE = "ROLE_TRAINEE";

    @Override
    public ResponseEntity<AuthResponse> authenticate(AuthRequest request) throws BadCredentialsException {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        User user = (User) authentication.getPrincipal();

        if (user.getStatus() == UserStatus.Unverified) {
            throw new UnverifiedUserException();
        }

        if (user.getStatus() == UserStatus.Inactive) {
            throw new CustomException("cant login to this user");
        }

        String accessToken = tokenUtil.generateAccessToken(user);
        AuthResponse response = new AuthResponse(user.getEmail(), accessToken, user.getFullName());
        return ResponseEntity.ok(response);
    }

    @Override
    public ResponseEntity<String> register(AuthRequest request, String password) {
        if (userRepository.findUserWithEmail(request.getEmail()) != null) {
            throw new CustomException("email already exist");
        }

        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = new User();
        user.setFullName(request.getFullName());

        String accountName = user.getFullName().replaceAll("\\s+", "").toLowerCase();
        user.setAccountName(accountNameGenerate(accountName));

        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(password));
        user.addRole(settingRepositories.findBySettingValue("ROLE_TRAINEE"));
        user.setStatus(UserStatus.Unverified);
        user.setMailToken(RandomString.make(30));
        userRepository.save(user);
        try {
            // String verifyUrl =
            // "https://lms-app-1.herokuapp.com/auth/verify?token="+user.getMailToken();
            String verifyUrl = request.getLink() + user.getMailToken();
            System.out.println(verifyUrl);
            sendRegisterMail(request.getEmail(), verifyUrl);
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok("Successfull register , password has been to your email");
    }

    public String accountNameGenerate(String accountName) {
        accountName = StringUltility.removeAccent(accountName);
        List<User> userWithSameName = userRepository.getUserWithAccNameStartWith(accountName);
        if (!userWithSameName.isEmpty()) {
            accountName += userWithSameName.size();
        }
        return accountName;
    }

    @Override
    public ResponseEntity<String> verifyUser(String token) {
        User user = userRepository.findByMailToken(token);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesnt exist");
        }
        System.out.print(user.getEmail());
        user.setStatus(UserStatus.Active);
        user.setMailToken(null);
        userRepository.save(user);
        return ResponseEntity.ok().body(user.getFullName() + " has been verified");
    }

    @Override
    public ResponseEntity<AuthResponse> googleAuthenticate(GoogleAuthRequest authRequest)
            throws GeneralSecurityException, IOException {

        Payload payload = googleHelper.getInfo(authRequest);
        if (payload == null) {
            throw new InvalidTokenException();
        }
        // Get profile information from payload
        String email = payload.getEmail();
        // boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
        String name = (String) payload.get("name");
        String pictureUrl = (String) payload.get("picture");
        // String locale = (String) payload.get("locale");
        // String familyName = (String) payload.get("family_name");
        // String givenName = (String) payload.get("given_name");

        User user = new User();
        if (userRepository.findByEmail(email).isPresent() == false) {
            PasswordEncoder encoder = new BCryptPasswordEncoder();
            String pass = RandomString.make(10);

            user.setEmail(email);
            user.setFullName(name);

            String accountName = user.getFullName().replaceAll("\\s+", "").toLowerCase();
            user.setAccountName(accountNameGenerate(accountName));

            user.setPassword(encoder.encode(pass));
            user.setAvatar_url(pictureUrl);
            user.setStatus(UserStatus.Active);
            user.addRole(settingRepositories.findBySettingValue(RoleEnum.ROLE_TRAINEE.toString()));

            try {
                sendGooglePass(email, pass);
            } catch (MessagingException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

        } else {
            user = userRepository.findByEmail(email).get();
            if (user.getAvatar_url() == null) {
                user.setAvatar_url(pictureUrl);
            }

            if (user.getAccountName() == null) {
                String accountName = user.getFullName().replaceAll("\\s+", "").toLowerCase();
                user.setAccountName(accountNameGenerate(accountName));
            }

            if (user.getStatus() == UserStatus.Unverified) {
                user.setStatus(UserStatus.Active);
                user.setMailToken(null);
            }
        }

        userRepository.save(user);
        // Authentication authentication = authenticationManager.authenticate(
        // new UsernamePasswordAuthenticationToken(email,
        // userRepository.findUserWithEmail(email).getPassword()));
        // User user = (User) authentication.getPrincipal();
        String accessToken = tokenUtil.generateAccessToken(user);
        AuthResponse response = new AuthResponse(user.getEmail(), accessToken, user.getFullName());

        return ResponseEntity.ok(response);
    }

    public void sendGooglePass(String email, String password)
            throws UnsupportedEncodingException, MessagingException {

        EmailDetails details = new EmailDetails();

        details.setRecipient(email);

        String subject = "Register sucessfull";

        String content = "<p>Hello,</p>"
                + "<p>Your account have been sucessfully created, here your password : " + password + ".</p>"
                + "<br>";
        details.setMsgBody(content);
        details.setSubject(subject);

        emailService.sendMimeMail(details);
    }

    public void sendRegisterMail(String email, String verifyUrl)
            throws UnsupportedEncodingException, MessagingException {

        EmailDetails details = new EmailDetails();

        details.setRecipient(email);

        String subject = "Register sucessfull";

        String content = "<p>Hello,</p>"
                + "<p>Your account have been sucessfully created .</p>"
                + "<p>For the final step , click the link below to activate your account :</p>"
                + "<p><a href=\"" + verifyUrl + "\">Click to verify your account  </a></p>"
                + "<br>";

        details.setMsgBody(content);
        details.setSubject(subject);

        emailService.sendMimeMail(details);
    }

    @Override
    public ResponseEntity<String> resendVerify(AuthRequest request) {
        User user = userRepository.findUserWithEmail(request.getEmail());
        if (user != null) {
            if (user.getStatus() == UserStatus.Unverified) {
                user.setMailToken(RandomString.make(30));
                userRepository.save(user);
            } else {
                throw new CustomException("user already verified");
            }
        } else {
            throw new CustomException("user doesnt exist");
        }

        try {

            String verifyUrl = request.getLink() + user.getMailToken();
            System.out.println(verifyUrl);
            sendRegisterMail(request.getEmail(), verifyUrl);
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok("verification mail sended");
    }

}
