package swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.filter.SubjectSettingFilterValue;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectSettingPaginate {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<SubjectSettingResponse> listResult;
    private List<SubjectSettingFilterValue> typeFilter;
    private List<String> subjectFilter; 
    private List <StatusEntity> statusFilter;
}
