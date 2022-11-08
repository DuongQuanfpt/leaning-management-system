package swp490.g23.onlinelearningsystem.entities.attendance.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDetailRequestDTO {
    private String accountName;

    private String fullName;

    private String classCode;

    private String status;

    private String comment;

    private String image;
}
