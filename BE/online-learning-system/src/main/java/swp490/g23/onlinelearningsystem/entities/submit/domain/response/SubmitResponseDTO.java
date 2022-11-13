package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterGroupDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitResponseDTO {

    Long submitId;

    String assignmentTitle;

    String milestoneTitle;

    SubmitFilterGroupDTO group;

    String traineeTitle;

    String fullName;

    String submitUrl;

    String status;

    String lastUpdate;
}
