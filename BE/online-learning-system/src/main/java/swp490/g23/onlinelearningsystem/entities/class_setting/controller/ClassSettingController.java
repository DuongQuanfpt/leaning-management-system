package swp490.g23.onlinelearningsystem.entities.class_setting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.filter.ClassSettingFilter;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.request.ClassSettingRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.response.ClassSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.response.ClassSettingResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_setting.service.impl.ClassSettingService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class ClassSettingController {

    @Autowired
    private ClassSettingService classSettingService;

    @GetMapping(value = "/class-setting")
	public ResponseEntity<ClassSettingPaginate> getClassSetting(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterStatus", required = false) String statusFilter,
			@RequestParam(name = "filterClass", required = false) String classFilter,
			@RequestParam(name = "filterType", required = false) String typeFilter,
			@AuthenticationPrincipal User user) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return classSettingService.getClassSetting(limit, page, keyword, statusFilter,classFilter,typeFilter, user);
	}

	@GetMapping(value = "/class-setting-detail/{id}")
	public ResponseEntity<ClassSettingResponseDTO> viewClassSetting(@PathVariable Long id) {

		return classSettingService.viewClassSetting(id);
	}

	@GetMapping(value = "/class-setting-filter")
	public ResponseEntity<ClassSettingFilter> ClassSettingFilter() {

		return classSettingService.getClassSettingFilter();
	}

	@PutMapping(value = "/class-setting-detail/{id}")
	public ResponseEntity<String> editClassSetting(@PathVariable Long id,
			@RequestBody ClassSettingRequestDTO request) {

		return classSettingService.editClassSetting(id, request);
	}

	@PutMapping(value = "/class-setting-status/{id}")
	public ResponseEntity<String> activateClassSetting(@PathVariable Long id) {

		return classSettingService.activateClassSetting(id);
	}

	@PostMapping(value = "/class-setting-add")
	public ResponseEntity<String> addClassSetting(@RequestBody ClassSettingRequestDTO request) {

		return classSettingService.addClassSetting(request);
	}
}
