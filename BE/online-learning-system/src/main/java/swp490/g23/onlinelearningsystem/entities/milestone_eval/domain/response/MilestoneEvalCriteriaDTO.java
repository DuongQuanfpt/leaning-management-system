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
    private Long criteriaId;
    private String criteriaTitle;
    private String comment;
    private Double weight;
    private Double grade;
    
}
