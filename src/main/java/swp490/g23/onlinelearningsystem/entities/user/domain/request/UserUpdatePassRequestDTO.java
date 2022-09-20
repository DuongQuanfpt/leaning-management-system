package swp490.g23.onlinelearningsystem.entities.user.domain.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class UserUpdatePassRequestDTO {
    private String email;
    private String newPassword;
    private String oldPassword;
}
