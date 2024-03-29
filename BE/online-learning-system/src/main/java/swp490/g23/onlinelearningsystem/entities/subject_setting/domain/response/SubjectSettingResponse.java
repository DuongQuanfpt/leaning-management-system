package swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.filter.SubjectSettingFilterValue;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectSettingResponse {
    private Long subjectSettingId;

    private String subjectCode;

    private SubjectSettingFilterValue typeName;
    
    private String settingTitle;

    private String settingValue;

    private String status;

    private String description;

    private String displayOrder;
}
