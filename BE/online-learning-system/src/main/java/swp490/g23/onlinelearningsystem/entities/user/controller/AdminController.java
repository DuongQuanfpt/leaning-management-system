package swp490.g23.onlinelearningsystem.entities.user.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.service.impl.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
@RolesAllowed({"ROLE_ADMIN"})
public class AdminController {

	public static final String ADD = "ADD";
	public static final String DELETE = "DELETE";
	public static final String EDIT = "EDIT";
	public static final String GET_ALL = "GET_ALL";

	@Autowired
	UserService userService;
    
    @GetMapping(value = "/") // API for registration
	public String register() {
		return "If u see this , u are a admin";
	}

	@GetMapping(value = "/user-list")
	public ResponseEntity<?> adminUserList(@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam("limit") int limit) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		return userService.displayUsers(limit, page);
	}

	@GetMapping(value = "/user/{id}")
	public ResponseEntity<?> getUser(@PathVariable("id") Long id) {

		return userService.viewUser(id);
	}

	@PutMapping(value = "/user/{id}")
	public ResponseEntity<?> viewSetting(@PathVariable("id") Long id, @RequestBody UserRequestDTO requestDTO) {

		return userService.updateUser(requestDTO,id);
	}

	@PutMapping(value = "/user/status/{id}")
	public ResponseEntity<?> updateSettingStatus(@PathVariable("id") Long id) {

		return userService.updateStatus(id);
	}
}
