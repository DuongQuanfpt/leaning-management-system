package swp490.g23.onlinelearningsystem.entities.assignment.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentRequestDTO {

    private Long assId;

    private String title;

    private String assBody;

    private String eval_weight;

    private int isTeamWork;

    private int isOnGoing;

    private String status;

    private String subjectName;
}
