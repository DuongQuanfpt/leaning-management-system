package swp490.g23.onlinelearningsystem.entities.groupMember.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMemberInfoDTO {

    Long userId;

    String email;

    String fullName;

    String username;
    
    String profileUrl;
}
