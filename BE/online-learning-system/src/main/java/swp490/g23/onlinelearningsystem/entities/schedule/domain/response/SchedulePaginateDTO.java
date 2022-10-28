package swp490.g23.onlinelearningsystem.entities.schedule.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ScheduleStatusEntity;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SchedulePaginateDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<ScheduleResponseDTO> listResult;
    private List<ScheduleStatusEntity> statusFilter;
}
