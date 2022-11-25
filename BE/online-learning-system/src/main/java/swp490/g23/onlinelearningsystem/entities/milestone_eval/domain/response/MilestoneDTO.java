package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneDTO {
    private String milestoneName;
    private Long milestoneId;
    private boolean isTeamWork;
    private List<MilestoneEvalCriteriaFilter> criteriaFilter;
    private List<MilestoneEvalGroupFilter> groupFilter;
}
