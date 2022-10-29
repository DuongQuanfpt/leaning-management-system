package swp490.g23.onlinelearningsystem.entities.schedule.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ScheduleStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleFilter {
    private List<ScheduleStatusEntity> statusFilter;
    private List<String> dateFilter;
    private List<String> yearFilter;
}
