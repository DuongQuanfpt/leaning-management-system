package swp490.g23.onlinelearningsystem.entities.permission.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionResponseDTO {
    String role;
    String roleValue;
    String component;
    String url;
    boolean get;
    boolean edit;
    boolean delete;
    boolean add;
}
