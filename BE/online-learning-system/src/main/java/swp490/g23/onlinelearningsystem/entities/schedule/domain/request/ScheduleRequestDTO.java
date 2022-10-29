package swp490.g23.onlinelearningsystem.entities.schedule.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleRequestDTO {

    private Long id;

    private String slot;

    private String topic;

    private String date;

    private String fromTime;

    private String toTime;

    private String status;

    private String room;
}
