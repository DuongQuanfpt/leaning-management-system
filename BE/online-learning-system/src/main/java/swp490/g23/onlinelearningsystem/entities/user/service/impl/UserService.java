package swp490.g23.onlinelearningsystem.entities.user.service.impl;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.mail.MessagingException;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.impl.EmailService;
import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.permission.domain.response.PermissionResponseDTO;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.criteria.PermissionCriteria;
import swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl.S3Service;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.filter.UserFilterDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.AuthenticatedResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserListResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserTypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.user.repositories.criteria.UserRepositoriesCriteria;
import swp490.g23.onlinelearningsystem.entities.user.service.IUserService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoUserException;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.UserStatusEntity;

@Service
public class UserService implements IUserService {

    @Autowired
    private UserRepositoriesCriteria userCriteria;

    @Autowired
    private PermissionCriteria permissionCriteria;

    @Autowired
    private SettingRepositories settingRepositories;

    @Autowired
    private EmailService emailService;

    @Autowired
    private S3Service s3Service;

    @Autowired
    private UserRepository userRepository;


    @Override
    public ResponseEntity<AuthenticatedResponseDTO> getAuthenticatedUser(Long id, List<Setting> roles) {
        User user = userRepository.findUserById(id, UserStatus.Active);

        if (user == null) {
            throw new NoUserException();
        }
        TypedQuery<SettingPermission> query = permissionCriteria.getScreenByRoles(roles);
        List<SettingPermission> result = query.getResultList();
        List<SettingPermission> resultFiltered = new ArrayList<>();

        for (SettingPermission sp : result) {
            if (sp.isCanAdd() == false && sp.isCanDelete() == false && sp.isCanEdit() == false
                    && sp.isCanGetAll() == false) {

            } else {
                resultFiltered.add(sp);
            }

        }

        return ResponseEntity.ok(toAuthenDTO(user, roles,resultFiltered));
    }

    @Override
    public ResponseEntity<String> updatePassword(UserUpdatePassRequestDTO dto, Long id) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findUserById(id, UserStatus.Active);

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
            Long userId , String username) {
        User user = userRepository.findById(userId).orElseThrow(NoUserException :: new);
        if (user == null) {
            throw new NoUserException();
        }
        // User user = userRepository.findById(userId).get();
        user.setMobile(mobile);
        user.setFullName(fullName);
        user.setAccountName(username);


        if (bas64Avatar != null) {
            String avatarUrl = s3Service.saveImg(bas64Avatar, user.getEmail().split("@")[0]);
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

    @Override
    public ResponseEntity<UserListResponsePaginateDTO> displayUsers(int limit, int currentPage, String keyword,
            String filterRole, String filterStatus) {
        List<UserResponseDTO> users = new ArrayList<>();
        TypedQuery<User> queryResult = userCriteria.displayUser(keyword, filterRole, filterStatus);

        int totalItem = queryResult.getResultList().size();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((currentPage - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (User user : queryResult.getResultList()) {
            users.add(toDTO(user));
        }

        UserListResponsePaginateDTO responseDTO = new UserListResponsePaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setTotalItem(totalItem);
        responseDTO.setListResult(users);
        responseDTO.setTotalPage(totalPage);

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<UserResponseDTO> viewUser(long id) {
        User user = userRepository.findById(id).get();
        return ResponseEntity.ok(toDTO(user));
    }

    @Override
    public ResponseEntity<String> updateUser(UserRequestDTO dto, Long id) {
        User user = userRepository.findById(id).orElseThrow(NoUserException::new);
        List<Setting> settings = new ArrayList<>();
        user.setNote(dto.getNote());

        if (!dto.getRoles().isEmpty()) {
            for (String role : dto.getRoles()) {
                settings.add(settingRepositories.findBySettingValue(role));
            }
            user.setSettings(settings);
        }

        userRepository.save(user);
        return ResponseEntity.ok("User has been updated");
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id) {
        User user = userRepository.findById(id).orElseThrow(NoUserException :: new);
        if (user.getStatus() == UserStatus.Active) {
            user.setStatus(UserStatus.Inactive);
        } else {
            user.setStatus(UserStatus.Active);
        }
        userRepository.save(user);
        return ResponseEntity.ok("User status updated");
    }

    @Override
    public ResponseEntity<UserFilterDTO> getFilter() {
        List<UserTypeResponseDTO> list = new ArrayList<>();
        List<UserStatusEntity> statuses = new ArrayList<>();

        for (Setting setting : settingRepositories.findAllRole()) {
            list.add(new UserTypeResponseDTO(setting.getSettingTitle(), setting.getSettingValue()));
        }

        for (UserStatus status : new ArrayList<UserStatus>(EnumSet.allOf(UserStatus.class))) {
            statuses.add(new UserStatusEntity(status));
        }

        UserFilterDTO filterDTO = new UserFilterDTO();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setRoleFilter(list);

        return ResponseEntity.ok(filterDTO);
    }

    public String uploadImageS3(String imgBase64) {
        return null;
    }

    // Convert Entity to DTO
    public UserResponseDTO toDTO(User entity) {
        UserResponseDTO responseDTO = new UserResponseDTO();
        responseDTO.setFullName(entity.getFullName());
        responseDTO.setUsername(entity.getAccountName());
        responseDTO.setEmail(entity.getEmail());
        responseDTO.setMobile(entity.getMobile());
        responseDTO.setNote(entity.getNote());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setUserId(entity.getUserId());
        responseDTO.setAvatar_url(entity.getAvatar_url());

        List<UserTypeResponseDTO> roleNames = new ArrayList<>();
        for (Setting setting : entity.getSettings()) {
            roleNames.add(new UserTypeResponseDTO(setting.getSettingTitle(), setting.getSettingValue()));
        }
        responseDTO.setRoles(roleNames);
        return responseDTO;
    }

    public AuthenticatedResponseDTO toAuthenDTO(User entity, List<Setting> roles, List<SettingPermission> permissions) {
        AuthenticatedResponseDTO responseDTO = new AuthenticatedResponseDTO();
        responseDTO.setFullName(entity.getFullName());
        responseDTO.setUsername(entity.getAccountName());
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

        List<PermissionResponseDTO> permissionDTO = new ArrayList<>();
        for (SettingPermission sp : permissions) {
            permissionDTO.add(new PermissionResponseDTO(sp.getRole().getSettingTitle(), sp.getRole().getSettingValue(),
                    sp.getScreen().getSettingTitle(), sp.getScreen().getSettingValue(),
                    sp.isCanGetAll(), sp.isCanEdit(), sp.isCanDelete(), sp.isCanAdd()));
        }
        responseDTO.setPermissions(permissionDTO);
        return responseDTO;
    }

}
