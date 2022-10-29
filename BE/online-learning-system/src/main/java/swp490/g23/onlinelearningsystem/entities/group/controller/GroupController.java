package swp490.g23.onlinelearningsystem.entities.group.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.group.domain.filter.GroupFilter;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupRequestDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupResponseDTO;
import swp490.g23.onlinelearningsystem.entities.group.service.impl.GroupService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class GroupController {

	@Autowired
	private GroupService groupService;

	@GetMapping(value = "/group")
	public ResponseEntity<GroupPaginateDTO> getGroupList(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterStatus", required = false) String statusFilter,
			@RequestParam(name = "filterMilestone", required = false) String milestoneFilter,
			@AuthenticationPrincipal User user) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return groupService.getGroup(limit, page, keyword, statusFilter, milestoneFilter, user);
	}

	@GetMapping(value = "/group-detail/{id}")
	public ResponseEntity<GroupResponseDTO> getGroup(@PathVariable("id") Long id) {

		return groupService.groupDetail(id);
	}

	@GetMapping(value = "/group-filter")
	public ResponseEntity<GroupFilter> getGroupFilter() {

		return groupService.groupFilter();
	}

	@PutMapping(value = "/group-status/{groupId}")
	public ResponseEntity<String> groupStatus(@PathVariable("groupId") Long groupId) {

		return groupService.groupStatus(groupId);
	}

	@PutMapping(value = "/group-detail/{id}/{milestoneId}")
	public ResponseEntity<String> editGroup(@RequestBody GroupRequestDTO dto,
			@PathVariable("id") Long id,
			@PathVariable("milestoneId") Long milestoneId) {

		return groupService.editGroup(id, milestoneId, dto);
	}

	@PutMapping(value = "/group-detach/{id}/{milestoneId}")
	public ResponseEntity<String> detachGroup(@PathVariable("id") Long id,
			@PathVariable("milestoneId") Long milestoneId) {

		return groupService.groupDetach(id, milestoneId);
	}

	@DeleteMapping(value = "/group-removes/{milestoneId}")
	public ResponseEntity<String> removesAllGroup(@PathVariable("milestoneId") Long milestoneId) {

		return groupService.groupRemoveAll(milestoneId);
	}

	@PostMapping(value = "/group-add/{milestoneId}")
	public ResponseEntity<String> addGroup(@RequestBody GroupRequestDTO dto,
			@PathVariable("milestoneId") Long milestoneId) {

		return groupService.groupCreate(milestoneId,dto);
	}

	
}
