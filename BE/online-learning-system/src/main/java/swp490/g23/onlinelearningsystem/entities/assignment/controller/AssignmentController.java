package swp490.g23.onlinelearningsystem.entities.assignment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentPaginate;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.assignment.service.impl.AssignmentService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class AssignmentController {

	@Autowired
	private AssignmentService asignmentService;

	@GetMapping(value = "/assignment")
	public ResponseEntity<AssignmentPaginate> getAssignment(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterSubject", required = false) String subjectFilter,
			@RequestParam(name = "filterStatus", required = false) String statusFilter) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);

		return asignmentService.getAssignment(limit, page, keyword, subjectFilter, statusFilter);
	}

	@GetMapping(value = "/assignment-detail/{id}")
	public ResponseEntity<AssignmentResponseDTO> viewAssignment(@PathVariable("id") Long id) {
		return null;
	}

	@PostMapping(value = "/assignment-add")
	public ResponseEntity<String> addAssignment() {
		return null;
	}

	@PutMapping(value = "/assignment-status/{id}")
	public ResponseEntity<String> updateStatus(@PathVariable("id") Long id) {
		return null;
	}

}
