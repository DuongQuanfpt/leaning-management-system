package swp490.g23.onlinelearningsystem.entities.user.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {
    
    @GetMapping(value = "/") // API for registration
	@RolesAllowed({"ROLE_ADMIN"})
	public String register() {
		return "If u see this , u are a admin";
	}
}
