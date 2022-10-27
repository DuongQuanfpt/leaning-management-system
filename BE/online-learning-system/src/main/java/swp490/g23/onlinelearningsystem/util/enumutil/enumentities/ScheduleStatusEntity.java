package swp490.g23.onlinelearningsystem.util.enumutil.enumentities;

import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;

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
