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
public class TraineeEvalDTO {
    private String fullName;
    private String userName;
    private String milestoneName;
    private String groupName;

    private Long workCriteriaId;
    private Long workCount;
    private Double workWeight;
    private Double workGrade;
    private Double bonusGrade;
    private Double milestoneGrade;

    private List<MilestoneEvalWorkDTO> evaluatedWork;
    private List<MilestoneEvalCriteriaDTO> evaluatedCriteria;
}
