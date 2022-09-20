package swp490.g23.onlinelearningsystem.entities.user.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.config.EmailConfig;
import swp490.g23.onlinelearningsystem.entities.email.EmailDetails;
import swp490.g23.onlinelearningsystem.entities.email.service.impl.EmailService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.user.service.IUserService;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;

@Service
public class UserService implements IUserService {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public UserResponseDTO createUser(UserRequestDTO UserRequestDTO) {

        User user = toEntity(UserRequestDTO);
        user = userRepository.save(user);
        return toDTO(user);
    }

    @Override
    public UserResponseDTO getAuthenticatedUser(String authoHeader) {

        return toDTO(getUserFromToken(authoHeader));
    }

    @Override
    public ResponseEntity<?> updatePassword(UserUpdatePassRequestDTO dto, String authoHeader) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = getUserFromToken(authoHeader);

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
        return ResponseEntity.ok(toDTO(user));
    }

    @Override
    public ResponseEntity<?> resetPassword(String email, String resetPass) {
        PasswordEncoder encoder = new BCryptPasswordEncoder();
        User user = userRepository.findOneByEmail(email);
        if (user != null) {
            user.setPassword(encoder.encode(resetPass));
            userRepository.save(user);
            
            EmailDetails details = new EmailDetails();
       
            details.setRecipient(email);
            details.setMsgBody("Your requested password is : "+resetPass);
            details.setSubject("Reset Password");

            emailService.sendSimpleMail(details);
            return ResponseEntity.ok(toDTO(user));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No user match with given email");
        }
    }

    // get User from jwt token
    public User getUserFromToken(String authoHeader) {
        String token = authoHeader.split(" ")[1].trim();
        String[] subjectArray = jwtTokenUtil.getSubject(token).split(",");
        Long userID = Long.parseLong(subjectArray[0]);

        return userRepository.findById(userID).get();
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

        return responseDTO;
    }

}
