package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaResponseDTO {
    private Long criteriaId;

    private String criteriaName;

    private int isTeamEval;

    private String evalWeight;

    private String expectedWork;

    private String description;

    private Status status;

    private String assignment;
}
