package swp490.g23.onlinelearningsystem.entities.group.domain.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.request.GroupMemberRequestDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupRequestDTO {

    private String groupCode;

    private String topicName;

    private String description;

    private String status;

    private List<GroupMemberRequestDTO> members; 
}
