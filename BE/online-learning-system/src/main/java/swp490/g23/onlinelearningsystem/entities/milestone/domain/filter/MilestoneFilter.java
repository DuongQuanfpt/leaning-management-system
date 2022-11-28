package swp490.g23.onlinelearningsystem.entities.milestone.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.enums.enumentities.MilestoneStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneFilter {
    private List<MilestoneStatusEntity> statusFilter;
    private List<AssignmentResponseDTO> assFilter;
    private List<MilestoneFilterClass> classFilter;
}
