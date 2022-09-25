package swp490.g23.onlinelearningsystem.entities.setting.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.service.impl.SettingService;

@RestController
@CrossOrigin

public class SettingController {
    
	@Autowired
	private SettingService settingService;

    @GetMapping(value = "/admin/setting") 
	@RolesAllowed({"ROLE_ADMIN"})
	public ResponseEntity<?> register() {
		return settingService.getSettingFilter();
	}
}
