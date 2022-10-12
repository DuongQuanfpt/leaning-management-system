package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeResponseDTO {
    private Long userId;

    private String fullName;

    private String username;

    private String email;

    private String mobile;

    private String status;

    private String note;

    private String clazz;
}
