package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentFilterType {

    private Long assignmentId;

    private String assignmentTitle;

    private String milestoneTitle;

    private String evalWeight;

    private boolean isFinal;

    private MilestoneStatusEnum status;
}
