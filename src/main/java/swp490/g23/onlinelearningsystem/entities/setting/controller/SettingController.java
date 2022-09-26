package swp490.g23.onlinelearningsystem.entities.setting.controller;

import javax.annotation.security.RolesAllowed;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.domain.request.SettingRequestDTO;
import swp490.g23.onlinelearningsystem.entities.setting.service.impl.SettingService;

@RestController
@CrossOrigin
@RolesAllowed({ "ROLE_ADMIN" })
public class SettingController {

	@Autowired
	private SettingService settingService;

	@GetMapping(value = "/admin/setting")

	public ResponseEntity<?> getSetting(@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam("limit") int limit) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		return settingService.displaySettings(limit, page);
	}

	@GetMapping(value = "/admin/setting/{id}")
	public ResponseEntity<?> getSetting(@PathVariable("id") Long id) {

		return settingService.viewSetting(id);
	}

	@PutMapping(value = "/admin/setting/{id}")
	public ResponseEntity<?> getSetting(@RequestBody SettingRequestDTO requestDTO) {

		return null;
	}

}
