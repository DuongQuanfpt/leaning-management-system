package swp490.g23.onlinelearningsystem.entities.milestone_eval.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalFilter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response.MilestoneEvalPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IMilestoneEvalService {
    ResponseEntity<MilestoneEvalPaginateDTO> getMilestoneEvalForm(int page, int limit, String keyword, Long milestoneId,
            Long groupId, User user);

    ResponseEntity<MilestoneEvalFilter> getMilestoneEvalFilter(String classCode);
}
