package swp490.g23.onlinelearningsystem.entities.work_update.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkUpdateWorkDTO {
    Long workId;

    String workTitle;

    String comments;

    Long milestoneId;

    String milestoneName;

    List<WorkUpdateResponseDTO> updateOfWork;

    List<WorkUpdateMilestoneDTO> milestoneOfSubmit;
}
