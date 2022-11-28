package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.enums.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaResponseDTO {
    private Long criteriaId;

    private String criteriaName;

    private int isTeamEval;

    private int isWorkEval;

    private Double evalWeight;

    private Long expectedWork;

    private String description;

    private Status status;

    private AssignmentResponseDTO assignment;

    private String subjectName;

    private MilestoneType milestone;

    private String classCode;
}
