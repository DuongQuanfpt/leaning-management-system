package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.enums.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaFilterDTO {
    private List<StatusEntity> statusFilter;
    private List<AssignmentResponseDTO> assignmentFilter;
    private List<MilestoneResponseDTO> milestoneFilter;
    private List<String> classFilter;
}
