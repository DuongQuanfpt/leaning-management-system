package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.TraineeStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeResponseDTO {
    private Long userId;

    private String fullName;

    private String username;

    private String profileUrl;

    private String email;

    private String mobile;

    private TraineeStatus status;

    private LocalDate dropDate;

    private String note;

    private String classes;

}
