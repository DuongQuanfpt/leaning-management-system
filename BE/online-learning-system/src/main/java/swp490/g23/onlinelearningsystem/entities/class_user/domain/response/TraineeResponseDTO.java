package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.TraineeStatus;

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

    private TraineeStatus status;

    private String note;

    private String classes;
}
