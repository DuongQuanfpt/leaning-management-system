package swp490.g23.onlinelearningsystem.entities.user.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.permission.domain.response.PermissionResponseDTO;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AuthenticatedResponseDTO {
    private Long userId;

    private String fullName;

    private String username;

    private String email;

    private String mobile;

    private String avatar_url;

    private UserStatus status;

    private String note;

    private List<String> roles;

    private List<PermissionResponseDTO> permissions;
}
