package swp490.g23.onlinelearningsystem.entities.user.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.filter.UserFilterDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.AuthenticatedResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserListResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;

public interface IUserService {

    ResponseEntity<AuthenticatedResponseDTO> getAuthenticatedUser(Long id ,List<Setting> roles); //get currently authenticated user

    ResponseEntity<String> updatePassword(UserUpdatePassRequestDTO newPassword, Long id);//update user password

    ResponseEntity<String> resetPassword(String email, String link);//sent reset pass link to user email

    ResponseEntity<String> resetProcessing(String newPassword ,String token);//update password for user get from token

    ResponseEntity<UserResponseDTO> updateUserProfile(String fullName,String bas64Avatar,String mobile,Long userId , String username);///update user profile

    ResponseEntity<UserListResponsePaginateDTO> displayUsers(int limit, int currentPage, String keyword, String filterRole, String filterStatus); 

    ResponseEntity<UserResponseDTO> viewUser(long id);

    ResponseEntity<String> updateUser(UserRequestDTO dto , Long id);

    ResponseEntity<String> updateStatus(Long id);

    ResponseEntity<UserFilterDTO> getFilter();
    
}
