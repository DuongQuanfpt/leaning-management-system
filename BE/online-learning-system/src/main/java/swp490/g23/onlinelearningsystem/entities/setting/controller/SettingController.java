package swp490.g23.onlinelearningsystem.entities.setting.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class SettingController {
    
    @GetMapping(value = "/admin/setting") 
	@RolesAllowed({"ROLE_ADMIN"})
	public String register() {
		return "If u see this , u are a admin";
	}
}
