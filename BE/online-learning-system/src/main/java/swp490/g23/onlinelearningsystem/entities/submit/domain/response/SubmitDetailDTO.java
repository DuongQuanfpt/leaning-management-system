package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWorkKey;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitDetailDTO {

    private Long id;

    private String requirement;

    private String assignee;

    private String fullName;

    private String milestone;

    private String team;

    private Long grade;

    private boolean isFinalEvaluated;

    private SubmitWorkKey submitWorkId;

    private SubmitWorkStatusEnum status;
}
