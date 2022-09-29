package swp490.g23.onlinelearningsystem.entities.user.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.user.service.impl.UserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

	@Autowired
	UserService userService;
    
    @GetMapping(value = "/") // API for registration
	@RolesAllowed({"ROLE_ADMIN"})
	public String register() {
		return "If u see this , u are a admin";
	}

	@GetMapping(value = "/user-list")
	public ResponseEntity<?> adninUserList(@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam("limit") int limit) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		return userService.displayUsers(limit, page);
	}
}
