package swp490.g23.onlinelearningsystem.entities.milestone_eval.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@CrossOrigin
@RequestMapping(Setting.API_PREFIX)
public class MilestoneEvalController {
    @GetMapping(value = "/milestone-eval")
    public ResponseEntity<?> displayMilestoneEval(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "groupId", required = false) Long groupId,
            @RequestParam(name = "filterAssignment", required = false) String assFilter,
            @RequestParam(name = "filterStatus", required = false) String statusFilter,
            @AuthenticationPrincipal User user) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
        // return milestoneService.displayMilestone(keyword, limit, page, classFilter, assFilter, statusFilter, user);
        return null;
    }
}
