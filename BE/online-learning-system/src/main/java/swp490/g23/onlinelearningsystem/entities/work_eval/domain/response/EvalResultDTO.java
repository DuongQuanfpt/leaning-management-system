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
    Long workPoint;

    EvalSettingDTO Complexity;

    EvalSettingDTO Quality;

    String comment;

    String milestoneName;

    Long milestoneId;

}