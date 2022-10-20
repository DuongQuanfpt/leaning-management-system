package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeImportResponse {

    private String importStatus;

    private String importMessage;

    private String username;

    private String email;
}
