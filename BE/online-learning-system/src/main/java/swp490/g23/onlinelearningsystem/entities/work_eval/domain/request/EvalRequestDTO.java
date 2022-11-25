package swp490.g23.onlinelearningsystem.entities.work_eval.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalRequestDTO {
    private Long complexityId;
    
    private Long qualityId;

    private Long workPoint;

    private String comment;

}
