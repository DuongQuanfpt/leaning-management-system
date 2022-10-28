package swp490.g23.onlinelearningsystem.entities.schedule.domain.response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleResponseDTO {

    private Long id;

    private List<String> slot;

    private List<String> topic;

    private LocalDate date;

    private LocalTime fromTime;

    private LocalTime toTime;

    private String classCode;

    private ScheduleStatus status;
}
