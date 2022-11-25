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
    private Long workId;

    private String workTitle;

    private String comments;

    private Long milestoneId;

    private String milestoneName;

    private List<WorkUpdateResponseDTO> updateOfWork;

    private List<WorkUpdateMilestoneDTO> milestoneOfSubmit;
}
