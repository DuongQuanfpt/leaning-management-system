package swp490.g23.onlinelearningsystem.entities.user.service;

import org.springframework.http.ResponseEntity;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;

public interface IUserService {
    UserResponseDTO createUser(UserRequestDTO UserRequestDTO);

    ResponseEntity<?> getAuthenticatedUser(String authoHeader);

    ResponseEntity<?> updatePassword(UserUpdatePassRequestDTO newPassword, String authoHeader);

    ResponseEntity<?> resetPassword(String email, String token);

}
