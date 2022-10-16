package swp490.g23.onlinelearningsystem.entities.class_user.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeRequestDTO {
    private Long userId;

    private String fullName;

    private String username;

    private String password;

    private String dropoutDate;

    private String email;

    private String mobile;

    private String status;

    private String note;

    private String classes;
}
