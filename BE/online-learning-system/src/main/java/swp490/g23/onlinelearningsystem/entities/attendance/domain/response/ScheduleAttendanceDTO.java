package swp490.g23.onlinelearningsystem.entities.attendance.domain.response;

import java.time.LocalDate;
import java.time.LocalTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.AttendanceStatus;
import swp490.g23.onlinelearningsystem.enums.ScheduleStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleAttendanceDTO {

    private String slot;

    private String topic;

    private LocalDate date;

    private LocalTime fromTime;

    private LocalTime toTime;

    private String room;

    private ScheduleStatus scheduleStatus;

    private AttendanceStatus attendanceStatus;
}
