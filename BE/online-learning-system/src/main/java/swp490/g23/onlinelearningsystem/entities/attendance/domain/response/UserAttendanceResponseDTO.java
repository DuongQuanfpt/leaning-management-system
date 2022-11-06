package swp490.g23.onlinelearningsystem.entities.attendance.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.AttendanceStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAttendanceResponseDTO {

    private String slot;

    private String date;

    private AttendanceStatus status;

    private String comment;

    public UserAttendanceResponseDTO(String slot, String date) {
        this.slot = slot;
        this.date = date;
    }

}
