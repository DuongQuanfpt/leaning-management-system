package swp490.g23.onlinelearningsystem.entities.submit.domain.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitFilterMilestoneDTO {
    Long milestoneId;
    String milestoneTitle;
    String assignmentTitle;
    boolean isTeamwork;
    String status;
}
