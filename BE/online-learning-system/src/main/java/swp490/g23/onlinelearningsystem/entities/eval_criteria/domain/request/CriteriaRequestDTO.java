package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaRequestDTO {
    private Long criteriaId;

    private String criteriaName;

    private int isTeamEval;

    private int isWorkEval;

    private String evalWeight;

    private Long expectedWork;

    private String description;

    private Status status;

    private Long assignmentId;

    private Long milestoneId;

    private String classCode;
}
