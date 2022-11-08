package swp490.g23.onlinelearningsystem.entities.attendance.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceResponseDTO {

    private String accountName;

    private String fullName;

    private String classCode;

    private List<UserAttendanceResponseDTO> userAttendance;

    private String absentPercent;
}