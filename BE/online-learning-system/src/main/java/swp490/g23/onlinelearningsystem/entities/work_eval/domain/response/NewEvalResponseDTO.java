package swp490.g23.onlinelearningsystem.entities.work_eval.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewEvalResponseDTO {
    Long workEvalId;
    String complexity;
    String quality;
    String comment;
    Long workEval;
}
