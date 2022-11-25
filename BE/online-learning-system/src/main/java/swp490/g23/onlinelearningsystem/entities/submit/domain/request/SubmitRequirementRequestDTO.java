package swp490.g23.onlinelearningsystem.entities.submit.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitRequirementRequestDTO {
    private String assigneeName;
    private Long requirementId;
}
