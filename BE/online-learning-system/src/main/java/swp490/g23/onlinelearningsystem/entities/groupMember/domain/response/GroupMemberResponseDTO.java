package swp490.g23.onlinelearningsystem.entities.groupMember.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberResponseDTO {

    private Long groupId;

    private String groupCode;

    private TraineeResponseDTO memberInfo;

    private Boolean isLeader;

    private Boolean isActive;
}
