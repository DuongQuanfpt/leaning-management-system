package swp490.g23.onlinelearningsystem.entities.user.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserUpdatePassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.service.impl.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
	@Autowired
	private UserService userService;

	@GetMapping(value = "/register") // API for registration
	@RolesAllowed({"ROLE_ADMIN"})
	public String register(@AuthenticationPrincipal User user) {
		return user.getFullName()+"A??"+user.getSettings()+"B??"+user.getAuthorities();
	}

	/**
	 * Get user info from the token sent from client
	 * 
	 * @param authoHeader // header contain access token sent from client
	 * @return info of the currently authenticated user
	 */
	@GetMapping // API to get info of the currently authenticated user
	public ResponseEntity<?> getAuthenticatedUser(@AuthenticationPrincipal User user) {

		return userService.getAuthenticatedUser(user.getUserId());
		// return ResponseEntity.ok(user.toString());
	}

	/**
	 * Update the password of the user extracted from token
	 * 
	 * @param updatePassRequestDTO // contain current password ,new password sent
	 *                             from client
	 * @param authoHeader          // header contain access token sent from client
	 * @return
	 */
	@PutMapping(value = "/update-pass")
	public ResponseEntity<?> updatePassword(@RequestBody UserUpdatePassRequestDTO updatePassRequestDTO,
											@AuthenticationPrincipal User user) {

		return userService.updatePassword(updatePassRequestDTO, user.getUserId());
	}

	/**
	 * Reset password of user
	 * 
	 * @param updatePassRequestDTO // contain email address sent from client
	 * @return sent a reset password link to user email
	 */

	@PutMapping(value = "/forgot-pass")
	public ResponseEntity<?> forgotPassword(@RequestBody UserUpdatePassRequestDTO updatePassRequestDTO) 
	{
		
		return userService.resetPassword(updatePassRequestDTO.getEmail(),updatePassRequestDTO.getLink());
	}

	/**
	 * Update password for user that request password reset 
	 * @param token get the user to update
	 * @param updatePassRequestDTO contain new password
	 * @return update user password and set mailToken to null
	 */
	@PutMapping(value = "/forgot-processing")
	public ResponseEntity<?> forgotProcess(@RequestParam("token")String token
										 ,@RequestBody UserUpdatePassRequestDTO updatePassRequestDTO) 
	{	
		return userService.resetProcessing(updatePassRequestDTO.getNewPassword(), token);
	}

	/**
	 * Update user info
	 * @param requestDTO contain new avartar_Url,fullName,mobile 
	 * @param user currently authenticated user
	 * @return update user info
	 */
	@PutMapping(value = "/update-profile")
	@RolesAllowed({"ROLE_TRAINEE"})
	public ResponseEntity<?> updateProfile(@RequestBody UserRequestDTO requestDTO
										  ,@AuthenticationPrincipal User user) 
	{
	
		return userService.updateUserProfile(requestDTO.getFullName(), requestDTO.getAvatar_url(), requestDTO.getMobile(), user.getUserId());
	}
}
