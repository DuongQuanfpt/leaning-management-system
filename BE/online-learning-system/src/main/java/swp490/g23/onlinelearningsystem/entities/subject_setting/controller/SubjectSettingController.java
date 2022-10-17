package swp490.g23.onlinelearningsystem.entities.subject_setting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingResponse;
import swp490.g23.onlinelearningsystem.entities.subject_setting.service.impl.SubjectSettingService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@CrossOrigin(exposedHeaders = "Authorization")
@RequestMapping(Setting.API_PREFIX)

public class SubjectSettingController {

    @Autowired
    private SubjectSettingService subjectSettingService;

    @GetMapping(value = "/subject-setting")
	public ResponseEntity<SubjectSettingPaginate> getSubjectSetting(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterStatus", required = false) String statusFilter,
            @RequestParam(name = "filterSubject", required = false) String subjectFilter,
			@RequestParam(name = "filterType", required = false) String typeFilter,
            @AuthenticationPrincipal User user) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return subjectSettingService.getSubjectSetting(limit, page , keyword ,statusFilter , subjectFilter, typeFilter,user);
	}

    @GetMapping(value = "/subject-setting-detail/{id}")
    public ResponseEntity<SubjectSettingResponse> viewSubjectSetting(@PathVariable Long id) {

        return subjectSettingService.viewSubjectSetting(id);
    }
}
