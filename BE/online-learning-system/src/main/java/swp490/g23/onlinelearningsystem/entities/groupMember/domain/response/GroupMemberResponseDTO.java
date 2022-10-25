package swp490.g23.onlinelearningsystem.entities.groupMember.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberResponseDTO {

    private String groupCode;

    private String member;

    private Boolean isLeader;

    private Boolean isActive;
}
