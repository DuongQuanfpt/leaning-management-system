package swp490.g23.onlinelearningsystem.enums.enumentities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.ScheduleStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleStatusEntity {
    String name;
    String value;

    public ScheduleStatusEntity(ScheduleStatus status) {
        this.name = status.toString();
        if (status == ScheduleStatus.Active) {
            this.value = "1";
        }

        if (status == ScheduleStatus.Inactive) {
            this.value = "0";
        }

        if (status == ScheduleStatus.Attendance_taken) {
            this.value = "-1";
        }
    }
}
