package swp490.g23.onlinelearningsystem.entities.issue.controller;


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

import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueBatchRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueResponseDTO;
import swp490.g23.onlinelearningsystem.entities.issue.service.impl.IssueService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class IssueController {

    @Autowired
    private IssueService issueService;

    @GetMapping(value = "/issue/{classCode}")
	public ResponseEntity<IssueListDTO> getIssueList(
			@RequestParam(name = "page", required = false) String currentPage,
			@RequestParam(name = "limit", required = false) String requestLimit,
			@RequestParam(name = "q", required = false) String keyword,
			@RequestParam(name = "statusId", required = false) Long filterStatus,
            @RequestParam(name = "groupId", required = false) Long filterGroupId,
			@RequestParam(name = "requirementId", required = false) Long filterRequirementId,
            @RequestParam(name = "milestoneId", required = false) Long milestoneId,
            @RequestParam(name = "asignee", required = false) String filterAssigneeName,
            @RequestParam(name = "typeId", required = false) Long filterTypeValue,
		    @PathVariable("classCode") String classCode) {

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		return issueService.getIssueList(page, limit, keyword, filterStatus, milestoneId, filterGroupId , filterAssigneeName, filterTypeValue ,classCode ,filterRequirementId);
	}

	@GetMapping(value = "/issue-list-filter/{classCode}")
	public ResponseEntity<IssueFilter> getIssueFilter(@PathVariable("classCode") String classCode) {

		return issueService.issueListFilter(classCode);
	}

	@GetMapping(value = "/issue-add-filter/{classCode}")
	public ResponseEntity<IssueFilter> addIssueFilter(@PathVariable("classCode") String classCode,
		@AuthenticationPrincipal User user) {

		return issueService.issueAddFilter(classCode,user);
	}


	@PostMapping(value = "/issue-add/{classCode}")
	public ResponseEntity<String> addIssue(@PathVariable("classCode") String classCode,
		@RequestBody IssueRequestDTO dto,
		@AuthenticationPrincipal User user ) {

		return issueService.issueAdd(classCode, dto ,user);
	}

	@PutMapping(value = "/issue-edit/{issueId}")
	public ResponseEntity<String> editIssue(@PathVariable("issueId") Long issueId,
		@RequestBody IssueRequestDTO dto,
		@AuthenticationPrincipal User user ) {

		return issueService.issueEdit(issueId, dto ,user);
	}

	@PutMapping(value = "/issue-batch-update")
	public ResponseEntity<String> updateBatchIssue(@RequestBody IssueBatchRequestDTO batchRequestDTO,
		@AuthenticationPrincipal User user ) {

		return issueService.updateBatchIssue(batchRequestDTO ,user);
	}



	// @PostMapping(value = "/issue-add-requirement/{classCode}")
	// public ResponseEntity<String> addRequirement(@PathVariable("classCode") String classCode,
	// 	@RequestBody IssueRequestDTO dto,
	// 	@AuthenticationPrincipal User user ) {

	// 	return issueService.requirementAdd(classCode, dto ,user);
	// }
	

	@GetMapping(value = "/issue-detail/{issueId}")
	public ResponseEntity<IssueResponseDTO> getIssueDetail(@PathVariable("issueId") Long issueId) {

		return issueService.issueDetail(issueId);
	}
}
