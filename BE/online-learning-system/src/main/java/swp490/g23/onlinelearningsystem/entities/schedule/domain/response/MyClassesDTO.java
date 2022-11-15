package swp490.g23.onlinelearningsystem.entities.schedule.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyClassesDTO {
    List<ScheduleResponseDTO> todayClasses;
    List<ScheduleResponseDTO> threeDaysAgo;
}
