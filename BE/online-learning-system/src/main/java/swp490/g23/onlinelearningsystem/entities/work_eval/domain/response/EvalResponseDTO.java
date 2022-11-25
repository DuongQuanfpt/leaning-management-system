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
    private String traineeName;

    private String groupName;

    private String milestoneName;

    private String functionName;

    private String functionDescription;

    private List<EvalSettingDTO> complexityFilter;

    private List<EvalSettingDTO> qualityFilter;

    private List<EvalUpdateDTO> updates;

    private List<EvalResultDTO> result;

}
