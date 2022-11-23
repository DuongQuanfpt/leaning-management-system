package swp490.g23.onlinelearningsystem.entities.work_eval.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalResultDTO {
    private Long workPoint;

    private EvalSettingDTO Complexity;

    private EvalSettingDTO Quality;

    private String comment;

    private String milestoneName;

    private Long milestoneId;

}
