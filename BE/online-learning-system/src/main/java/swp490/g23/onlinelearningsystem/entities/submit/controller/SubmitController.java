package swp490.g23.onlinelearningsystem.entities.submit.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterDTO;
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
                classCode ,isGroup);
    }

    @GetMapping(value = "/submit-list-filter/{classCode}")
    public ResponseEntity<SubmitFilterDTO> getSubmitListFilter(@PathVariable("classCode") String classCode,
            @AuthenticationPrincipal User user) {

        return submitService.getSubmitListFilter(user , classCode);
    }
}
