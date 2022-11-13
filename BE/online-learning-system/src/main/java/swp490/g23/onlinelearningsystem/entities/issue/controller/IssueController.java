package swp490.g23.onlinelearningsystem.entities.issue.controller;

import java.util.Base64;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueBatchRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueFilterRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueMultiRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueDetailDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
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
			@RequestParam(name = "isIssue", required = false) boolean isIssue,
			@RequestParam(name = "filter", required = false) String filterJson,
			@RequestParam(name = "milestoneId", required = false) Long filterMilestoneId,
			@PathVariable("classCode") String classCode) throws JsonMappingException, JsonProcessingException{

		int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
		int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
		
		IssueFilterRequestDTO filterRequestDTO =  new IssueFilterRequestDTO();
		if(filterJson != null) {
			byte[] result = Base64.getDecoder().decode(filterJson);
			String decodedFilter = new String(result);
			filterRequestDTO = new ObjectMapper().readValue(decodedFilter, IssueFilterRequestDTO.class);
			System.out.println( "DECODED FILTER : " + filterRequestDTO.getGroupIds().toString());
		}
		return issueService.getIssueList(page, limit, keyword, classCode, isIssue, filterMilestoneId, filterRequestDTO);
	}

	@GetMapping(value = "/issue-list-filter/{classCode}")
	public ResponseEntity<IssueFilter> getIssueFilter(@PathVariable("classCode") String classCode,
		@AuthenticationPrincipal User user) {

		return issueService.issueListFilter(classCode , user);
	}

	@GetMapping(value = "/issue-add-filter/{classCode}")
	public ResponseEntity<IssueFilter> addIssueFilter(@PathVariable("classCode") String classCode,
			@AuthenticationPrincipal User user) {

		return issueService.issueAddFilter(classCode, user);
	}

	@GetMapping(value = "/requirement-add-filter/{classCode}")
	public ResponseEntity<IssueFilter> addRequirementFilter(@PathVariable("classCode") String classCode,
			@AuthenticationPrincipal User user) {

		return issueService.requirementAddFilter(classCode, user);
	}

	@PostMapping(value = "/issue-add/{classCode}")
	public ResponseEntity<String> addIssue(@PathVariable("classCode") String classCode,
			@RequestBody IssueRequestDTO dto,
			@AuthenticationPrincipal User user) {

		return issueService.issueAdd(classCode, dto, user);
	}

	@PutMapping(value = "/issue-detail/{issueId}")
	public ResponseEntity<String> editIssue(@PathVariable("issueId") Long issueId,
			@RequestBody IssueRequestDTO dto,
			@AuthenticationPrincipal User user) {

		return issueService.issueEdit(issueId, dto, user);
	}

	@PutMapping(value = "/issue-multichange")
	public ResponseEntity<String> multiChangeRequirement(@RequestBody IssueMultiRequestDTO dto,
			@AuthenticationPrincipal User user) {

		return issueService.issueMultiChange(user, dto);
	}

	@PutMapping(value = "/issue-batch-update")
	public ResponseEntity<String> updateBatchIssue(@RequestBody IssueBatchRequestDTO batchRequestDTO,
			@AuthenticationPrincipal User user) {

		return issueService.updateBatchIssue(batchRequestDTO, user);
	}

	@GetMapping(value = "/issue-detail/{issueId}")
	public ResponseEntity<IssueDetailDTO> getIssueDetail(@PathVariable("issueId") Long issueId,
		@AuthenticationPrincipal User user) {

		return issueService.issueDetail(issueId , user);
	}
}
