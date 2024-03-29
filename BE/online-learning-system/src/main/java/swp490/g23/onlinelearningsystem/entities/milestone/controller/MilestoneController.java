package swp490.g23.onlinelearningsystem.entities.milestone.controller;

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

import swp490.g23.onlinelearningsystem.entities.milestone.domain.filter.MilestoneFilter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.request.MilestoneRequestDTO;
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
    public ResponseEntity<String> milestoneEdit(@RequestBody MilestoneRequestDTO dto,
            @PathVariable Long id) {

        return milestoneService.milestonEdit(dto, id);
    }

    @PutMapping(value = "/milestone-inprogess/{id}")
    public ResponseEntity<String> milestoneToInprogress(@PathVariable Long id) {

        return milestoneService.milestoneInProgess(id);
    }

    @PutMapping(value = "/milestone-closed/{id}")
    public ResponseEntity<String> milestoneClosed(@PathVariable Long id) {

        return milestoneService.milestoneClosed(id);
    }

    @PostMapping(value = "/milestone-add")
    public ResponseEntity<String> milestoneAdd(@RequestBody MilestoneRequestDTO dto) {

        return milestoneService.milestonAdd(dto);
    }

    @GetMapping(value = "/milestone-filter/{classCode}")
    public ResponseEntity<MilestoneFilter> milestoneFilter(@AuthenticationPrincipal User user,
    @PathVariable String classCode) {

        return milestoneService.milestoneFilter(user.getUserId(),classCode);
    }
}
