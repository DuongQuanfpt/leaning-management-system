package swp490.g23.onlinelearningsystem.entities.auth.domain.request;

import javax.validation.constraints.Email;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AuthRequest {
    @Email
    private String email;

    private String password;

    private String fullName;

    private String link;
    
    
}
