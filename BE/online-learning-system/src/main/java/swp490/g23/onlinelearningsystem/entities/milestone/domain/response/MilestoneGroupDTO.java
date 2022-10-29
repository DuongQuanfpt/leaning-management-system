package swp490.g23.onlinelearningsystem.entities.milestone.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneGroupDTO {
    private Long groupId;
    private String groupCode;
    private String topicName;
    private List<MilestoneMemberDTO>memberList;
    
}
