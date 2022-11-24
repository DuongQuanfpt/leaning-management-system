package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalCriteriaRequest {
    private Long criteriaId;
    private Double grade;
    private String comment;
}
