package swp490.g23.onlinelearningsystem.entities.user.domain.response;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class UserResponseDTO  {

    private Long userId;

    private String fullName;

    private String email;

    private String mobile;

    private String avatar_url;

    private String status;

    private String note;

    private List<String> roles;
    
}
