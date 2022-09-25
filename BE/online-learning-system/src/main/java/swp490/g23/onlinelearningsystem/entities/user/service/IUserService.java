package swp490.g23.onlinelearningsystem.entities.user.service;

import org.springframework.http.ResponseEntity;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;

public interface IUserService {

    ResponseEntity<?> getAuthenticatedUser(Long id);

    ResponseEntity<?> updatePassword(UserUpdatePassRequestDTO newPassword, Long id);

    ResponseEntity<?> resetPassword(String email, String token);

    ResponseEntity<?> updateUserProfile(String fullName,String avatarUrl,String mobile,Long userId);

}
