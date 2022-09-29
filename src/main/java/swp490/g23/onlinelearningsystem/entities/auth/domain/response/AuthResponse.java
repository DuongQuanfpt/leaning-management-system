package swp490.g23.onlinelearningsystem.entities.auth.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class AuthResponse {

    private String email;

    private String accessToken;

    private String fullName;

}
