package swp490.g23.onlinelearningsystem.entities.auth.domain.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor
public class AuthResponse {

    private String email;

    private String accessToken;

    private String fullName;

    public AuthResponse(String email, String accessToken, String fullName) {
        this.email = email;
        this.accessToken = accessToken;
        this.fullName = fullName;
    }

    
}