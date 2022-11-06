package swp490.g23.onlinelearningsystem.entities.issue.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueUserDTO {
    private Long userId;

    private String fullName;

    private String username;

    private String email;

    private String mobile;

    private String avatar_url;

    private String status;

    private String note;
}
