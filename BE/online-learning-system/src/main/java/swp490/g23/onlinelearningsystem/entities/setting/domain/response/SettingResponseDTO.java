package swp490.g23.onlinelearningsystem.entities.setting.domain.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.EnumEntity.SettingStatusEnum;

@Getter
@Setter
@NoArgsConstructor
public class SettingResponseDTO {

    private Long settingId;

    private String settingTitle;

    private String settingValue;

    private SettingStatusEnum status;

    private String description;

    private String displayOrder;

    private String typeName;

    public SettingResponseDTO(Long settingId, String settingTitle, String settingValue, SettingStatusEnum status,
            String description, String displayOrder, String typeName) {
        this.settingId = settingId;
        this.settingTitle = settingTitle;
        this.settingValue = settingValue;
        this.status = status;
        this.description = description;
        this.displayOrder = displayOrder;
        this.typeName = typeName;
    }

    
}
