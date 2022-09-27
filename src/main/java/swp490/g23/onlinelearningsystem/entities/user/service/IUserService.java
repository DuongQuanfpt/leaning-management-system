package swp490.g23.onlinelearningsystem.entities.user.service;

import org.springframework.http.ResponseEntity;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;

public interface IUserService {

    ResponseEntity<UserResponseDTO> getAuthenticatedUser(Long id); //get currently authenticated user

    ResponseEntity<String> updatePassword(UserUpdatePassRequestDTO newPassword, Long id);//update user password

    ResponseEntity<String> resetPassword(String email, String link);//sent reset pass link to user email

    ResponseEntity<String> resetProcessing(String newPassword ,String token);//update password for user get from token

    ResponseEntity<UserResponseDTO> updateUserProfile(String fullName,String avatarUrl,String mobile,Long userId);///update user profile

}
