package swp490.g23.onlinelearningsystem.entities.user.service;

import org.springframework.http.ResponseEntity;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;

public interface IUserService {

    ResponseEntity<?> getAuthenticatedUser(Long id); //get currently authenticated user

    ResponseEntity<?> updatePassword(UserUpdatePassRequestDTO newPassword, Long id);//update user password

    ResponseEntity<?> resetPassword(String email, String link);//sent reset pass link to user email

    ResponseEntity<?> resetProcessing(String newPassword ,String token);//update password for user get from token

    ResponseEntity<?> updateUserProfile(String fullName,String avatarUrl,String mobile,Long userId);///update user profile

    ResponseEntity<?> displayUsers(int limit, int currentPage); 

    ResponseEntity<?> viewUser(long id);

    ResponseEntity<?> updateUser(UserResponseDTO dto , Long id);

    ResponseEntity<?> updateStatus(Long id);

}
