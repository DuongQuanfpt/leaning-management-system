package swp490.g23.onlinelearningsystem.entities.milestone.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.milestone.domain.filter.MilestoneFilter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestonePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.service.impl.MilestoneService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class MilestoneController {

    @Autowired
    private MilestoneService milestoneService;

    @GetMapping(value = "/milestone")
    public ResponseEntity<MilestonePaginateDTO> displayMilestone(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "filterClass", required = false) String classFilter,
            @RequestParam(name = "filterAssignment", required = false) String assFilter,
            @RequestParam(name = "filterStatus", required = false) String statusFilter,
            @AuthenticationPrincipal User user) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
        return milestoneService.displayMilestone(keyword, limit, page, classFilter, assFilter, statusFilter, user);
    }
    
	@GetMapping(value = "/milestone-detail/{id}")
	public ResponseEntity<MilestoneResponseDTO> milestoneDetail(@PathVariable Long id) {

		return milestoneService.milestoneDetail(id);
	}

    @PutMapping(value = "/milestone-detail/{id}")
	public ResponseEntity<MilestoneResponseDTO> milestoneEdit(@PathVariable Long id) {

		return milestoneService.milestoneDetail(id);
	}

    @PostMapping(value = "/milestone-add")
	public ResponseEntity<MilestoneResponseDTO> milestoneAdd(@PathVariable Long id) {

		return milestoneService.milestoneDetail(id);
	}

    @GetMapping(value = "/milestone-filter")
	public ResponseEntity<MilestoneFilter> milestoneFilter() {

		return milestoneService.milestoneFilter();
	}
}
