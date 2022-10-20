package swp490.g23.onlinelearningsystem.entities.class_setting.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSettingRequestDTO {

    private String classCode;

    private String typeValue;

    private String settingTitle;

    private String settingValue;

    private String status;

    private String description;

    private String displayOrder;
}
