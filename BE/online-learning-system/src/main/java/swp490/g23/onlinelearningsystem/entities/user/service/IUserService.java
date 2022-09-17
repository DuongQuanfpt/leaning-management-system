package swp490.g23.onlinelearningsystem.entities.user.service;

import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;

public interface IUserService {
    UserResponseDTO save(UserRequestDTO UserRequestDTO);
    UserResponseDTO getAuthenticatedUser(String authoHeader);
}
