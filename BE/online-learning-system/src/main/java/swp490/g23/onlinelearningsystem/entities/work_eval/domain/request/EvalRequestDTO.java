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
    Long complexityId;
    
    Long qualityId;

    Long workPoint;

    String comment;

}
