package swp490.g23.onlinelearningsystem.entities.user.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGroupDTO {
    Long groupId;
    String groupCode;
    boolean isIsLeader;
}
