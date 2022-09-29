package swp490.g23.onlinelearningsystem.entities.user.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.MessagingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.impl.EmailService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserListResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.user.service.IUserService;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;
import swp490.g23.onlinelearningsystem.util.EnumEntity.UserStatusEnum;

@Service
public class UserService implements IUserService {

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public ResponseEntity<?> getAuthenticatedUser(Long id) {
        User user = userRepository.findUserById(id);

        if (user != null) {

            return ResponseEntity.ok(toDTO(user));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("There are no authenticated user");

    }

    @Override
    public ResponseEntity<?> updatePassword(UserUpdatePassRequestDTO dto, Long id) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findUserById(id);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesnt exsist");
        }

        if (dto.getOldPassword() != null) {
            if (dto.getOldPassword().equals(dto.getNewPassword())) { // compare newpassword with oldpassword
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("New password must be different from current password");
            }

            if (encoder.matches(dto.getOldPassword(), user.getPassword()) == false) {// compare oldpassword with user
                                                                                     // password
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password not match with user");
            }
        }

        dto.setNewPassword(encoder.encode(dto.getNewPassword()));
        user.setPassword(dto.getNewPassword());
        user = userRepository.save(user);
        return ResponseEntity.ok("your password have been updated");
    }

    @Override
    public ResponseEntity<?> resetPassword(String email, String link) {
        User user = userRepository.findOneByEmail(email);
        if (user != null) {
            user.setMailToken(RandomString.make(30));
            userRepository.save(user);

            link = link + user.getMailToken();
            resetPasswordMail(user.getEmail(), link);
            return ResponseEntity.ok("your password have been reset , we have sent the new password to your email");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user match with given email");
        }
    }

    @Override
    public ResponseEntity<?> resetProcessing(String newPassword, String token) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findByMailToken(token);
        if(user == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesnt exist");
        }
        user.setPassword(encoder.encode(newPassword));
        user.setMailToken(null);
        userRepository.save(user);
        return ResponseEntity.ok().body("Your password have been reset sucessfully");
    }

    @Override
    public ResponseEntity<?> updateUserProfile(String fullName, String avatarUrl, String mobile, Long userId) {
        if (!userRepository.findById(userId).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesnt exist");
        }
        User user = userRepository.findById(userId).get();
        user.setMobile(mobile);
        user.setFullName(fullName);
        user.setAvatar_url(avatarUrl);
        userRepository.save(user);

        return ResponseEntity.ok(toDTO(user));
    }

    //sent email with password reset link to user
    public void resetPasswordMail(String email, String verifyUrl) {

        EmailDetails details = new EmailDetails();

        details.setRecipient(email);

        String subject = "Here's the link to reset your password";

        String content = "<p>Hello,</p>"
                + "<p>You have requested to reset your password.</p>"
                + "<p>Click the link below to change your password:</p>"
                + "<p><a href=\"" + verifyUrl + "\">Change my password</a></p>"
                + "<br>";

        details.setMsgBody(content);
        details.setSubject(subject);

        try {
            emailService.sendMimeMail(details);
        } catch (UnsupportedEncodingException | MessagingException e) {
            e.printStackTrace();
        }
    }

    // get User from jwt token
    public User getUserFromToken(String authoHeader) {

        String token = authoHeader.split(" ")[1].trim();

        Claims claims = jwtTokenUtil.parseClaims(token);

        String claimsRole = (String) claims.get("roles");
        claimsRole = claimsRole.replace("[", "").replace("]", "");
        String[] roles = claimsRole.split(",");

        String[] subjectArray = jwtTokenUtil.getSubject(token).split(",");
        Long userID = Long.parseLong(subjectArray[0]);
        if (!userRepository.findById(userID).isPresent()) {
            return null;
        }

        User user = userRepository.findById(userID).get();
        for (String role : roles) {
            user.addRole(settingRepositories.findActiveSettingByValue(role));
        }
        return user;
    }

    // Convert DTO to Entity
    public User toEntity(UserRequestDTO requestDTO) {
        User entity = new User();

        if (requestDTO.getUserId() != null) {
            entity.setUserId(requestDTO.getUserId());
        }
        entity.setFullName(requestDTO.getFullName());
        entity.setEmail(requestDTO.getEmail());
        entity.setMobile(requestDTO.getMobile());
        entity.setPassword(requestDTO.getPassword());
        entity.setNote(requestDTO.getNote());
        entity.setStatus(requestDTO.getStatus());
        entity.setAvatar_url(requestDTO.getAvatar_url());

        return entity;
    }

    @Override
    public ResponseEntity<?> displayUsers(int limit, int currentPage) {
        Pageable pageable = PageRequest.of(currentPage - 1, limit, Sort.by(Sort.Direction.ASC, "userId"));
        List<User> users = userRepository.findAll(pageable).getContent();
        List<UserResponseDTO> result = new ArrayList<>();

        for (User user : users) {
            result.add(toDTO(user));
        }

        UserListResponsePaginateDTO responseDTO = new UserListResponsePaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setListResult(result);
        responseDTO.setTotalPage((int) Math.ceil((double) userRepository.count() / limit));

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<?> viewUser(long id) {
        User user = userRepository.findById(id).get();
        if (user.getUserId() != null) {
            return ResponseEntity.ok(toDTO(user));
        }
        return ResponseEntity.ok("Cant view this user");
    }

    @Override
    public ResponseEntity<?> updateUser(UserRequestDTO dto, Long id) {
        User user = userRepository.findById(id).get();

        user.setNote(dto.getNote());
        //roles
        userRepository.save(user);
        return ResponseEntity.ok("Setting has been udated");
    }

    @Override
    public ResponseEntity<?> updateStatus(Long id) {
        User user = userRepository.findById(id).get();
        if (user.getStatus() == UserStatusEnum.ACTIVE) {
            user.setStatus(UserStatusEnum.INACTIVE);
        } else {
            user.setStatus(UserStatusEnum.ACTIVE);
        }
        userRepository.save(user);
        return ResponseEntity.ok("User status updated");
    }

    // Convert Entity to DTO
    public UserResponseDTO toDTO(User entity) {
        UserResponseDTO responseDTO = new UserResponseDTO();
        responseDTO.setFullName(entity.getFullName());
        responseDTO.setEmail(entity.getEmail());
        responseDTO.setMobile(entity.getMobile());
        responseDTO.setNote(entity.getNote());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setUserId(entity.getUserId());
        responseDTO.setAvatar_url(entity.getAvatar_url());

        List<String> roleNames = new ArrayList<>();
        for (Setting setting : entity.getSettings()) {
            roleNames.add(setting.getSettingTitle());
        }
        responseDTO.setRoles(roleNames);
        return responseDTO;
    }
}
