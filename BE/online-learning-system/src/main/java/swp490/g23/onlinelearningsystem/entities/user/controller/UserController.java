package swp490.g23.onlinelearningsystem.entities.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.service.impl.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
    private UserService userService;

    @PostMapping(value ="/register")// API for registration
	public UserResponseDTO createNew(@RequestBody UserRequestDTO userRequestDTO) {
       
		return userService.save(userRequestDTO);

	}
}
