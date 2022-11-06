package swp490.g23.onlinelearningsystem.entities.attendance.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceRequestDTO {

    private Long userId;

    private String comment;

    private String classCode;

    private String topic;

    private String date;

    private String status;
}
