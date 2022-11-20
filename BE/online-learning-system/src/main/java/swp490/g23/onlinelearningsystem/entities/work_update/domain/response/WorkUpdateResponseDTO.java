package swp490.g23.onlinelearningsystem.entities.work_update.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class WorkUpdateResponseDTO {

    Long id;

    String title;

    String description;

    String updateDate;

    Long milestoneId;

    String milestoneName;
}
