package swp490.g23.onlinelearningsystem.entities.classes.controller;

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

import swp490.g23.onlinelearningsystem.entities.classes.domain.filter.ClassFilterDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.request.ClassRequestDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponseDTO;
import swp490.g23.onlinelearningsystem.entities.classes.domain.response.ClassResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.classes.service.impl.ClassService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@CrossOrigin
@RequestMapping(Setting.API_PREFIX)
public class ClassController {
    
    @Autowired
	private ClassService classService;

    @GetMapping("/class")
    public ResponseEntity<ClassResponsePaginateDTO> classList(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterTerm", required = false) String filterTerm,
			@RequestParam(name = "filterTrainer", required = false) String filterTrainer,
			@RequestParam(name = "filterSupporter", required = false) String filterSupporter,
			@RequestParam(name = "filterBranch", required = false) String filterBranch,
			@RequestParam(name = "filterStatus", required = false) String filterStatus,
			@RequestParam(name = "filterSubject", required = false) String filterSubject,
			@AuthenticationPrincipal User user) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return classService.displayClasses(limit, page, keyword, filterTerm, filterTrainer, filterSupporter, filterBranch, filterStatus,user,filterSubject);
	}

    @GetMapping("/class-filter")
	public ResponseEntity<ClassFilterDTO> getUserFilter(@AuthenticationPrincipal User user) {

		return classService.getFilter(user);
	}

	@GetMapping("/class-detail/{id}")
	public ResponseEntity<ClassResponseDTO> getUser(@PathVariable("id") Long id) {

		return classService.viewClass(id);
	}

	@PutMapping(value = "/class-detail/{id}")
	public ResponseEntity<String> viewSetting(@PathVariable("id") Long id, @RequestBody ClassRequestDTO requestDTO) {

		return classService.updateClass(requestDTO,id);
	}

	@PutMapping(value = "/class-status/{id}")
	public ResponseEntity<String> updateSettingStatus(@PathVariable("id") Long id) {

		return classService.updateStatus(id);
	}

	@PostMapping(value = "/class-add")
	public ResponseEntity<String> addUser(@RequestBody ClassRequestDTO requestDTO) {

		return classService.addClass(requestDTO);
	}
}
