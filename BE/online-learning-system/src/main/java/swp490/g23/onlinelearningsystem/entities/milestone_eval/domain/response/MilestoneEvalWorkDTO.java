package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalWorkDTO {
    private Long submitId;

    private Long requirementId;

    private String requirementName;

    private String complexityName;

    private String qualityname;

    private Long currentPoint;

    private String comment;
}
