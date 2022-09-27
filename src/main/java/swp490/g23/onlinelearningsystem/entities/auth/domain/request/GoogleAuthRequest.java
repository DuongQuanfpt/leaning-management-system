package swp490.g23.onlinelearningsystem.entities.auth.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class GoogleAuthRequest {
    String idToken;
    String clientId;
}
