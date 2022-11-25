package swp490.g23.onlinelearningsystem.entities.work_update.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class WorkUpdateMilestoneDTO {
    private String milestoneName;
    private Long milestoneId;
}
