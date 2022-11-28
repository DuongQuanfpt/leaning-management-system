package swp490.g23.onlinelearningsystem.entities.submit.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.enumentities.SubmitStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitFilterDTO {
    List<SubmitFilterMilestoneDTO> milestoneFilter;
    List<SubmitStatusEntity> statusFilter;
}
