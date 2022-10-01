package swp490.g23.onlinelearningsystem.entities.user.controller;

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
import swp490.g23.onlinelearningsystem.entities.user.domain.filter.UserFIlterDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.request.UserRequestDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserListResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.service.impl.UserService;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class AdminController {

	public static final String ADD = "ADD";
	public static final String DELETE = "DELETE";
	public static final String EDIT = "EDIT";
	public static final String GET_ALL = "GET_ALL";

	@Autowired
	private UserService userService;
    
    @GetMapping(value = "/") // API for registration
	public String register() {
		return "If u see this , u are a admin";
	}

	@GetMapping(value = "/user-list")
	public ResponseEntity<UserListResponsePaginateDTO> adminUserList(@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam("limit") int limit) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		return userService.displayUsers(limit, page);
	}

	@GetMapping(value = "/user-filter")
	public ResponseEntity<UserFIlterDTO> getUserFilter() {

		return userService.getFilter();
	}

	@GetMapping(value = "/user/{id}")
	public ResponseEntity<UserResponseDTO> getUser(@PathVariable("id") Long id) {

		return userService.viewUser(id);
	}

	@PutMapping(value = "/user/{id}")
	public ResponseEntity<String> viewSetting(@PathVariable("id") Long id, @RequestBody UserRequestDTO requestDTO) {

		return userService.updateUser(requestDTO,id);
	}

	@PutMapping(value = "/user-status/{id}")
	public ResponseEntity<String> updateSettingStatus(@PathVariable("id") Long id) {

		return userService.updateStatus(id);
	}
}
