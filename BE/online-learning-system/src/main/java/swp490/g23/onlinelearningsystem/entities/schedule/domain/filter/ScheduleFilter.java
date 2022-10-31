package swp490.g23.onlinelearningsystem.entities.schedule.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ModuleTypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.SettingTypeResponseDTO;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ScheduleStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleFilter {
    private List<ScheduleStatusEntity> statusFilter;
    private List<String> dateFilter;
    private List<String> yearFilter;
    private List<SettingTypeResponseDTO> roomFilter;
    private List<ModuleTypeResponseDTO> slotFilter;
}
