package swp490.g23.onlinelearningsystem.entities.milestone.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneMemberDTO {

    private String userName;

    private String fullName;

    private String avatarUrl;

    private String email;

    private boolean isLeader;

    private boolean isActive;
}
