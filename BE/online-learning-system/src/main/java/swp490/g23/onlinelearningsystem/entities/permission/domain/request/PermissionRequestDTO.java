package swp490.g23.onlinelearningsystem.entities.permission.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PermissionRequestDTO {
    String roleValue;
    String url;
    boolean get;
    boolean edit;
    boolean delete;
    boolean add;
}
