package swp490.g23.onlinelearningsystem.entities.user.service.impl;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.user.service.IUserService;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserResponseDTO save(UserRequestDTO UserRequestDTO) {
        User user = toEntity(UserRequestDTO);
        user = userRepository.save(user);
        return toDTO(user);
    }

    public List<User> stuff (){
        return userRepository.findAll();
    }
    
    //Convert DTO to Entity
    public User toEntity (UserRequestDTO requestDTO) {
        User entity = new User();

        if(requestDTO.getUserId() != null){
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

    //Convert Entity to DTO
    public UserResponseDTO toDTO (User entity) {
        UserResponseDTO  responseDTO = new UserResponseDTO();
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
