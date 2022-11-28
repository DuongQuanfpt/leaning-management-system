package swp490.g23.onlinelearningsystem.entities.subject_setting.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectSettingFilter {
    private List<String> subjectFilter; 
    private List <StatusEntity> statusFilter;
    private List<SubjectSettingFilterValue> typeFilter;
    private List<String> quality;
    private List<String> complexity;
}
