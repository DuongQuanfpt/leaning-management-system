package swp490.g23.onlinelearningsystem.entities.milestone.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.MilestoneStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestonePaginateDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<MilestoneResponseDTO> listResult;
    private List<AssignmentResponseDTO> assFilter;
    private List<String> classFilter; 
    private List <MilestoneStatusEntity> statusFilter;
}
