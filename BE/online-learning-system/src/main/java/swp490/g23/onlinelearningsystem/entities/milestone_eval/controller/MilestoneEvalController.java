package swp490.g23.onlinelearningsystem.entities.milestone_eval.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request.MilestoneEvalRequestWrapper;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.TraineeEvalDTO;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.service.impl.MilestoneEvalService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@CrossOrigin
@RequestMapping(Setting.API_PREFIX)
public class MilestoneEvalController {

    @Autowired
    private MilestoneEvalService milestoneEvalService;

    @GetMapping(value = "/milestone-eval/{milestoneId}")
    public ResponseEntity<MilestoneEvalPaginateDTO> displayMilestoneEval(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "groupId", required = false) Long groupId,
            @PathVariable("milestoneId") Long milestoneId,
            @AuthenticationPrincipal User user) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
        return milestoneEvalService.getMilestoneEvalForm(page , limit , keyword ,  milestoneId ,groupId ,user);
    }

    @GetMapping(value = "/milestone-eval-filter/{classCode}")
    public ResponseEntity<MilestoneEvalFilter> milestoneEvalFilter(@PathVariable("classCode") String classCode) {

        return milestoneEvalService.getMilestoneEvalFilter(classCode);
    }

    @GetMapping(value = "/trainee-result/{submitId}")
    public ResponseEntity<TraineeEvalDTO> traineeEval(@PathVariable("submitId") Long submitId,
            @AuthenticationPrincipal User user) {
        return milestoneEvalService.traineeEval(submitId, user);
    }

    @PostMapping(value = "/milestone-eval/{milestoneId}")
    public ResponseEntity<String> milestoneEval(@PathVariable("milestoneId") Long milestoneId,
            @RequestBody MilestoneEvalRequestWrapper evalRequestWrapper) {

        return milestoneEvalService.milestoneEval(milestoneId, evalRequestWrapper);
    }

}
