package swp490.g23.onlinelearningsystem.entities.user.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;

public interface IUserService {

    ResponseEntity<?> getAuthenticatedUser(User user);

    ResponseEntity<?> updatePassword(UserUpdatePassRequestDTO newPassword, String authoHeader);

    ResponseEntity<?> resetPassword(String email, String token);

    ResponseEntity<?> updateUserProfile(String fullName,String avatarUrl,String mobile,Long userId);

}
