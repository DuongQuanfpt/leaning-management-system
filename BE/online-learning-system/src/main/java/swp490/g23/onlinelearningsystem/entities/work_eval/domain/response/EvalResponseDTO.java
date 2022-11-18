package swp490.g23.onlinelearningsystem.entities.work_eval.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalResponseDTO {
    String traineeName;
    
    String groupName;

    String milestoneName;

    String functionName;

    String functionDescription;

    List<EvalSettingDTO> complexityFilter;

    List<EvalSettingDTO> qualityFilter;

    Long workPoint;

    EvalSettingDTO currentComplexity;

    EvalSettingDTO currentQuality;

    Long newWorkPoint;

    EvalSettingDTO newComplexity;

    EvalSettingDTO newQuality;

}
