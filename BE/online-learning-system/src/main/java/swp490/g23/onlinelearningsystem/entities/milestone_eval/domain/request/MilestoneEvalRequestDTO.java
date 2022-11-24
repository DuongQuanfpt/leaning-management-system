package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalRequestDTO {
    private Long submitId;
    private String comment;
    private Double bonus;
    private Double grade;
    private Double workGrade;
    private Long workPoint;
    private Long workCriteriaId;
    List<EvalCriteriaRequest> criteria;
}
