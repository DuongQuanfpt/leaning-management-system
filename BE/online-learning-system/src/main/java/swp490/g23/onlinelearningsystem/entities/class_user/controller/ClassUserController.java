package swp490.g23.onlinelearningsystem.entities.class_user.controller;

import java.util.List;

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

import swp490.g23.onlinelearningsystem.entities.class_user.domain.filter.TraineeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.TraineeRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;
import swp490.g23.onlinelearningsystem.entities.class_user.service.impl.ClassUserService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class ClassUserController {

	@Autowired
	ClassUserService classUserService;

	@Autowired
	UserRepository userRepository;

	@GetMapping(value = "/trainee")
	public ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterClass", required = false) String classFilter,
			@RequestParam(name = "filterStatus", required = false) String statusFilter,
			@AuthenticationPrincipal User user) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return classUserService.displayTrainee(limit, page, keyword, classFilter, statusFilter, user.getUserId());
	}

	@GetMapping(value = "/trainee-filter")
	public ResponseEntity<TraineeFilterDTO> getFilter() {

		return classUserService.getFilter();
	}

	@PutMapping(value = "/trainee-status/{userId}/{classCode}")
	public ResponseEntity<String> updateSettingStatus(@PathVariable("userId") Long userId,
			@PathVariable String classCode) {
		return classUserService.updateStatus(userId, classCode);
	}

	@PutMapping(value = "/trainee-dropout/{userId}/{classCode}")
	public ResponseEntity<String> dropTrainee(@PathVariable("userId") Long userId,
			@PathVariable("classCode") String classCode, @RequestBody TraineeRequestDTO dto) {
		return classUserService.setDropout(userId, classCode, dto);
	}

	@PostMapping(value = "/trainee-import")
	public ResponseEntity<String> importTrainee(@RequestBody List<TraineeRequestDTO> requestDTO) {

		return classUserService.addTrainee(requestDTO);
	}

	@GetMapping(value = "/trainee-detail/{userId}/{classCode}")
	public ResponseEntity<TraineeResponseDTO> viewTrainee(@PathVariable("userId") Long userId,
			@PathVariable("classCode") String classCode) {
		return classUserService.viewTrainee(userId, classCode);
	}

}
