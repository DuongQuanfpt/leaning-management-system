package swp490.g23.onlinelearningsystem.entities.work_eval.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.service.impl.WorkEvalService;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class WorkEvalController {

    @Autowired
    private WorkEvalService evalService;

    @GetMapping(value = "/work-eval/{submitId}/{workId}")
    public ResponseEntity<EvalResponseDTO> getWorkEval(@PathVariable("submitId") Long submitId,
            @PathVariable("workId") Long workId,
            @AuthenticationPrincipal User user) {

        return evalService.getWorkEval(user, submitId, workId);
    }

    @PutMapping(value = "/work-eval/{submitWorkId}")
    public ResponseEntity<?> workEvaluation(@PathVariable("submitId") Long submitId,
            @AuthenticationPrincipal User user) {

        return null;
    }
}
