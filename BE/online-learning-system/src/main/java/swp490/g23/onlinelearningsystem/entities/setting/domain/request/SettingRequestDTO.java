package swp490.g23.onlinelearningsystem.entities.setting.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.EnumEntity.StatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SettingRequestDTO {
    private Long settingId;

    private String settingTitle;

    private String settingValue;

    private StatusEnum status;

    private String description;

    private String displayOrder;

    private String typeName;
}
