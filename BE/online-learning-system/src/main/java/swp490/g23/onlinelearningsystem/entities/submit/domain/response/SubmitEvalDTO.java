package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitEvalDTO {

    Long submitId;

    Long requirementId;

    String requirementName;

    String complexityName;

    String qualityname;

    Long currentPoint;

    String comment;

}
