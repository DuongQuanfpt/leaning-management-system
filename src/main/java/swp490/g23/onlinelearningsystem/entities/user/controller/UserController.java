package swp490.g23.onlinelearningsystem.entities.user.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.service.impl.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;

	@PostMapping(value = "/register") // API for registration
	public UserResponseDTO register(@RequestBody @Valid UserRequestDTO userRequestDTO) {
		PasswordEncoder encoder = new BCryptPasswordEncoder();
		userRequestDTO.setPassword(encoder.encode(userRequestDTO.getPassword()));
		return userService.createUser(userRequestDTO);

	}

	@GetMapping // API to get info of the currently authenticated user
	public UserResponseDTO getAuthenticatedUser(@RequestHeader("Authorization") String authoHeader) {

		return userService.getAuthenticatedUser(authoHeader);
	}

	@PutMapping(value = "/update-pass")
	public ResponseEntity<?> updatePassword(@RequestBody UserUpdatePassRequestDTO updatePassRequestDTO
										 ,@RequestHeader("Authorization") String authoHeader){
											
		return userService.updatePassword(updatePassRequestDTO, authoHeader);
	}

	@PutMapping(value = "/forgot-pass")
	public ResponseEntity<?> forgotPassword(@RequestBody UserUpdatePassRequestDTO updatePassRequestDTO){
		String resetToken = RandomString.make(10);						
		return userService.resetPassword(updatePassRequestDTO.getEmail(), resetToken);
	}
}
