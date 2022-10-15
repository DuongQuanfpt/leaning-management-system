package swp490.g23.onlinelearningsystem.entities.assignment.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentResponseDTO {
    
    private Long assId;

    private String title;

    private String assBody;

    private String eval_weight;

    private boolean isTeamWork;

    private boolean isOnGoing;

    private Status status;

    private String subjectName;
}
