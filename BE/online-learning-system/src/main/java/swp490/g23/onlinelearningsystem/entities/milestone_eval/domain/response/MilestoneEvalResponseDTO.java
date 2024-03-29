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
public class MilestoneEvalResponseDTO {
    private Long submitId;
    private String userName;
    private String fullName;
    private Long groupId;
    private String groupName;
    private Long workCriteriaId;
    private Double workWeight;
    private Long workPoint;
    private Double workGrade;
    private Double milestoneGrade;
    private Double bonusGrade;
    private String comment;
    private List<MilestoneEvalCriteriaDTO> criteriaPoints;
}
