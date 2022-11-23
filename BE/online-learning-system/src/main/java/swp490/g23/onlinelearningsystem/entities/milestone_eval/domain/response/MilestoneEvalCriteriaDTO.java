package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalCriteriaDTO {
    Long criteriaId;
    String criteriaTitle;
    Double grade;
    
}
