package swp490.g23.onlinelearningsystem.entities.group.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupClassMemberDTO {
    private Long userId;

    private String fullName;

    private String username;

    private String profileUrl;

    private String email;
}
