package swp490.g23.onlinelearningsystem.entities.group.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.MemberStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupFilter {
    private List<MemberStatusEntity> statusFilter;
    private List<MilestoneResponseDTO> milstoneFilter;
}
