package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitResponseDTO {

    Long submitId;

    String assignmentTitle;

    String milestoneTitle;

    String groupTitle;

    String traineeTitle;

    String status;

    String lastUpdate;
}
