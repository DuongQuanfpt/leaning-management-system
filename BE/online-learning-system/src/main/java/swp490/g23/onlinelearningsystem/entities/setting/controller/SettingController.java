package swp490.g23.onlinelearningsystem.entities.setting.controller;

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

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.domain.filter.SettingFilterDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.request.SettingRequestDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponseDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.setting.service.impl.SettingService;

@RestController
@CrossOrigin(exposedHeaders = "Authorization")
@RequestMapping(Setting.API_PREFIX)
public class SettingController {

	@Autowired
	private SettingService settingService;

	@GetMapping(value = "/setting")
	public ResponseEntity<SettingResponsePaginateDTO> getSetting(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return settingService.displaySettings(limit, page);
	}

	@GetMapping(value = "/setting-filter")
	public ResponseEntity<SettingFilterDTO> getSettingFilter() {

		return settingService.getFilter();
	}

	@GetMapping(value = "/setting/{id}")
	public ResponseEntity<SettingResponseDTO> getSetting(@PathVariable("id") Long id) {

		return settingService.viewSetting(id);
	}

	@PutMapping(value = "/setting/{id}")
	public ResponseEntity<String> viewSetting(@PathVariable("id") Long id, @RequestBody SettingRequestDTO requestDTO) {

		return settingService.updateSetting(requestDTO, id);
	}

	@PutMapping(value = "/setting-status/{id}")
	public ResponseEntity<String> updateSettingStatus(@PathVariable("id") Long id) {

		return settingService.updateStatus(id);
	}

}
