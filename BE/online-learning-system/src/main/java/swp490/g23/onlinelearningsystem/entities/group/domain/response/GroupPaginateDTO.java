package swp490.g23.onlinelearningsystem.entities.group.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.enums.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupPaginateDTO {
    private int page;
	private int totalPage;
	private long totalItem;
    private List<GroupResponseDTO> listResult ;
    private List<TraineeResponseDTO> noGroup;
    // private List<MilestoneResponseDTO> milstoneFilter;
    private List<StatusEntity> statusFilter;
  
}
