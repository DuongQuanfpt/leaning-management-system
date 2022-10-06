package swp490.g23.onlinelearningsystem.entities.subject.controller;

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
import swp490.g23.onlinelearningsystem.entities.subject.domain.filter.SubjectFilter;
import swp490.g23.onlinelearningsystem.entities.subject.domain.request.SubjectRequestDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponseDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.subject.service.impl.SubjectService;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class SubjectController {

	@Autowired
	SubjectService service;

	@GetMapping(value = "/subjects")
	public ResponseEntity<SubjectResponsePaginateDTO> getSetting(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterManager", required = false) String managerFilter,
			@RequestParam(name = "filterExpert", required = false) String expertFilter,
			@RequestParam(name = "filterStatus", required = false) String status) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);

		return service.getSubject(limit, page, keyword, managerFilter, expertFilter, status);
	}

	@GetMapping(value = "/subjects/{id}")
	public ResponseEntity<SubjectResponseDTO> getSettingDetails(@PathVariable("id") Long id) {

		return service.getSubjectDetail(id);
	}

	@PutMapping(value = "/subjects/{id}")
	public ResponseEntity<String> editSettingDetails(@PathVariable("id") Long id,
			@RequestBody SubjectRequestDTO dto) {

		return service.editSubject(id, dto);
	}

	@PutMapping(value = "/subjects-status/{id}")
	public ResponseEntity<String> editSettingDetails(@PathVariable("id") Long id) {

		return service.editSubjectStatus(id);
	}

	@PutMapping(value = "/subjects-filter")
	public ResponseEntity<SubjectFilter> editSettingDetails() {
		
		return service.subjectFilter();
	}

}
