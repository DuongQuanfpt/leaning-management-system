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
public class AssignmentGradeDTO {

    private Long assignmentId;

    private String assingmentTitle;

    private String milestoneTitle;

    private Double grade;

    private boolean isFinal;

    private MilestoneStatusEnum status;

    private String comment;

    private String evalWeight;
}
