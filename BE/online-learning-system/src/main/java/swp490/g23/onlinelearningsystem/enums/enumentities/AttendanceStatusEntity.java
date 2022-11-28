package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.AttendanceStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceStatusEntity {
    String name;
    String value;

    public AttendanceStatusEntity(AttendanceStatus status) {
        this.name = status.toString();
        if (status == AttendanceStatus.Present) {
            this.value = "1";
        }

        if (status == AttendanceStatus.Late) {
            this.value = "0";
        }

        if (status == AttendanceStatus.Absent) {
            this.value = "-1";
        }
    }
}
