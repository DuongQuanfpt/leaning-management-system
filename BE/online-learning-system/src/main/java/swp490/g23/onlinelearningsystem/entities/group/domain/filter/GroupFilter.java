package swp490.g23.onlinelearningsystem.entities.group.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupMilestoneDTO;
import swp490.g23.onlinelearningsystem.enums.enumentities.TraineeStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupFilter {
    private List<TraineeStatusEntity> statusFilter;
    private List<GroupMilestoneDTO> milstoneFilter;
}
