package swp490.g23.onlinelearningsystem.entities.issue.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class IssueController {
    @GetMapping(value = "/issue")
	public ResponseEntity<IssueListDTO> getIssueList(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "filterStatus", required = false) String filterStatus,
            @RequestParam(name = "filterTeamId", required = false) String filterTeamId,
            @RequestParam(name = "filterMilestone", required = false) String filterMilestone,
            @RequestParam(name = "filterAssignmentId", required = false) String filterAssignmentId,
            @RequestParam(name = "filterAssigneeName", required = false) String filterAssigneeName,
            @RequestParam(name = "filterTypeValue", required = false) String filterTypeValue,
		    @AuthenticationPrincipal User user) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return null;
	}
}
