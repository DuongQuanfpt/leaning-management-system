package swp490.g23.onlinelearningsystem.entities.group.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.response.GroupMemberResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupResponseDTO {
    private Long groupId;

    private String classCode;

    private String groupCode;

    private String topicName;

    private String description;

    private String status;
    
    private List<GroupMemberResponseDTO> groupMembers; 

    private List<MilestoneResponseDTO> milestone;

    
}
