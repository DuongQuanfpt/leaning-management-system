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
import swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl.S3Service;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.filter.UserFIlterDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.AuthenticatedResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserListResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.user.service.IUserService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoUserException;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;
import swp490.g23.onlinelearningsystem.util.EnumEntity.UserStatusEnum;

@Service
public class UserService implements IUserService {

    // Autowired
    // private AmazonS3Client ;
    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private EmailService emailService;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public ResponseEntity<AuthenticatedResponseDTO> getAuthenticatedUser(Long id, List<Setting> roles) {
        User user = userRepository.findUserById(id);

        if (user == null) {
            throw new NoUserException();
        }
        return ResponseEntity.ok(toAuthenDTO(user, roles));
    }

    @Override
    public ResponseEntity<String> updatePassword(UserUpdatePassRequestDTO dto, Long id) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findUserById(id);

        if (user == null) {
            throw new NoUserException();
        }

        if (dto.getOldPassword() != null) {
            if (dto.getOldPassword().equals(dto.getNewPassword())) { // compare newpassword with oldpassword
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("New password must be different from current password");
            }
            if (user.getPassword() != null) {
                if (encoder.matches(dto.getOldPassword(), user.getPassword()) == false) {// compare oldpassword with
                                                                                         // user
                    // password
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password not match with user");
                }
            } else if (dto.getOldPassword() != "") {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password not match with user");
            }

        }

        dto.setNewPassword(encoder.encode(dto.getNewPassword()));
        user.setPassword(dto.getNewPassword());
        user = userRepository.save(user);
        return ResponseEntity.ok("your password have been updated");
    }

    @Override
    public ResponseEntity<String> resetPassword(String email, String link) {
        User user = userRepository.findActiveUserByEmail(email);
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
    public ResponseEntity<String> resetProcessing(String newPassword, String token) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findByMailToken(token);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User doesnt exist");
        }
        user.setPassword(encoder.encode(newPassword));
        user.setMailToken(null);
        userRepository.save(user);
        return ResponseEntity.ok().body("Your password have been reset sucessfully");
    }

    @Override
    public ResponseEntity<UserResponseDTO> updateUserProfile(String fullName, String bas64Avatar, String mobile,
            Long userId) {
        if (!userRepository.findById(userId).isPresent()) {
            throw new NoUserException();
        }
        User user = userRepository.findById(userId).get();
        user.setMobile(mobile);
        user.setFullName(fullName);

        if(bas64Avatar !=null){
            String avatarUrl=s3Service.saveImg(bas64Avatar, user.getEmail().split("@")[0]);
            user.setAvatar_url(avatarUrl);
        }
       

        userRepository.save(user);

        return ResponseEntity.ok(toDTO(user));
    }

    // sent email with password reset link to user
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

    @Override
    public ResponseEntity<UserListResponsePaginateDTO> displayUsers(int limit, int currentPage) {
        List<User> users = new ArrayList<>();
        if (limit == 0 ) {
            users = userRepository.findAll();   
        } else {
            Pageable pageable = PageRequest.of(currentPage - 1, limit, Sort.by(Sort.Direction.ASC, "userId"));
            users = userRepository.findAll(pageable).getContent();
        }
        List<UserResponseDTO> result = new ArrayList<>();

        for (User user : users) {
            result.add(toDTO(user));
        }

        UserListResponsePaginateDTO responseDTO = new UserListResponsePaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setListResult(result);
        if (limit == 0) {
            responseDTO.setTotalPage(0);
        } else{
            responseDTO.setTotalPage((int) Math.ceil((double) userRepository.count() / limit));
        }

        responseDTO.setTotalItem(userRepository.count());
        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<UserResponseDTO> viewUser(long id) {
        User user = userRepository.findById(id).get();
        return ResponseEntity.ok(toDTO(user));
    }

    @Override
    public ResponseEntity<String> updateUser(UserRequestDTO dto, Long id) {
        User user = userRepository.findById(id).get();
        List<Setting> settings = new ArrayList<>();
        user.setNote(dto.getNote());
        for (String role : dto.getRoles()){
            settings.add(settingRepositories.findBySettingValue(role));
        }
        user.setSettings(settings);


        userRepository.save(user);
        return ResponseEntity.ok("User has been updated");
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id) {
        User user = userRepository.findById(id).get();
        if (user.getStatus() == UserStatusEnum.ACTIVE) {
            user.setStatus(UserStatusEnum.INACTIVE);
        } else {
            user.setStatus(UserStatusEnum.ACTIVE);
        }
        userRepository.save(user);
        return ResponseEntity.ok("User status updated");
    }

    
    @Override
    public ResponseEntity<UserFIlterDTO> getFilter() {
        List<String> list = new ArrayList<>();
        for (Setting setting : settingRepositories.roleList()) {
            list.add(setting.getSettingTitle());
        }

        UserFIlterDTO filterDTO = new UserFIlterDTO();
        filterDTO.setStatusFilter(List.of(UserStatusEnum.ACTIVE.toString(), UserStatusEnum.INACTIVE.toString(), UserStatusEnum.UNVERIFIED.toString()));
        filterDTO.setRoleFilter(list);
        
        return ResponseEntity.ok(filterDTO);
    }

    public String uploadImageS3(String imgBase64){
        return null;
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

    public AuthenticatedResponseDTO toAuthenDTO(User entity, List<Setting> roles) {
        AuthenticatedResponseDTO responseDTO = new AuthenticatedResponseDTO();
        responseDTO.setFullName(entity.getFullName());
        responseDTO.setEmail(entity.getEmail());
        responseDTO.setMobile(entity.getMobile());
        responseDTO.setNote(entity.getNote());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setUserId(entity.getUserId());
        responseDTO.setAvatar_url(entity.getAvatar_url());

        List<String> roleNames = new ArrayList<>();
        for (Setting setting : roles) {
            roleNames.add(setting.getSettingTitle());
        }
        responseDTO.setRoles(roleNames);
        return responseDTO;
    }

}
