package swp490.g23.onlinelearningsystem.entities.class_setting.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSettingResponseDTO {
    
    private Long classSettingId;

    private String classCode;

    private String typeName;

    private String settingTitle;

    private String settingValue;

    private String status;

    private String description;

    private String displayOrder;
}
