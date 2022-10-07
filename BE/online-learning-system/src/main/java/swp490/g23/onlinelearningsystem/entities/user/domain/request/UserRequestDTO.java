package swp490.g23.onlinelearningsystem.entities.user.domain.request;

import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

@Getter @Setter @NoArgsConstructor
public class UserRequestDTO  {
    private Long userId;

    private String fullName;

    @Email
    private String email;
    
    @Pattern(regexp="[^\s]{4,30}")
    private String password;

    private String mobile;

    private String avatarBase64;

    private UserStatus status;

    private String note;

    private List<String> roles;
}
