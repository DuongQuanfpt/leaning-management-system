package swp490.g23.onlinelearningsystem.entities.auth.domain.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class AuthRequest {
    @Email
    private String email;

    @Pattern(regexp="[^\s]{4,30}")
    private String password;

    private String fullName;
    
    
}
