package swp490.g23.onlinelearningsystem.entities.submit.controller;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.NewSubmitFilter;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementWrapper;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.submit.service.impl.SubmitService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class SubmitController {

    @Autowired
    private SubmitService submitService;

    @GetMapping(value = "/submit/{classCode}")
    public ResponseEntity<SubmitPaginateDTO> displaySubmit(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "isGroup", required = false) boolean isGroup,
            @RequestParam(name = "milestoneId", required = false) Long milestoneId,
            @RequestParam(name = "assignmentId", required = false) Long assignmentId,
            @RequestParam(name = "groupId", required = false) Long groupId,
            @RequestParam(name = "statusValue", required = false) Long statusValue,
            @PathVariable("classCode") String classCode,
            @AuthenticationPrincipal User user) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
        return submitService.displaySubmit(limit, page, keyword, milestoneId, assignmentId, groupId, statusValue, user,
                classCode, isGroup);
    }

    @GetMapping(value = "/submit-list-filter/{classCode}")
    public ResponseEntity<SubmitFilterDTO> getSubmitListFilter(@PathVariable("classCode") String classCode,
            @AuthenticationPrincipal User user) {

        return submitService.getSubmitListFilter(user, classCode);
    }

    @GetMapping(value = "/new-submit/{submitId}")
    public ResponseEntity<NewSubmitFilter> newSubmitFilter(@PathVariable("submitId") Long submitId,
            @AuthenticationPrincipal User user) {

        return submitService.newSubmitFilter(user, submitId);
    }

    @PostMapping(value = "/new-submit/{submitId}")
    public ResponseEntity<String> newSubmit(@PathVariable("submitId") Long submitId,
            @RequestPart(name = "requirementIds", required = false) String base64Requirement,
            @RequestPart(name = "submitFile") MultipartFile submitFile,
            @AuthenticationPrincipal User user) throws JsonMappingException, JsonProcessingException {

        SubmitRequirementWrapper requirementWrapper = new SubmitRequirementWrapper();
        if (base64Requirement != null) {
            byte[] result = Base64.getDecoder().decode(base64Requirement);
            String decoded= new String(result);
            requirementWrapper = new ObjectMapper().readValue(decoded, SubmitRequirementWrapper.class);
            System.out.println("DECODED REQUIREMENT : " + requirementWrapper.getRequirementIds().toString());
        }

        return submitService.newSubmit(user, submitId, requirementWrapper, submitFile);
    }
}
