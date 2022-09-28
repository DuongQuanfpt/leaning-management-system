package swp490.g23.onlinelearningsystem.entities.user.domain.response;

import java.util.Collection;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.EnumEntity.UserStatusEnum;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AuthenticatedResponseDTO {
    private Long userId;

    private String fullName;

    private String email;

    private String mobile;

    private String avatar_url;

    private UserStatusEnum status;

    private String note;

    private Collection<?> roles;
}
