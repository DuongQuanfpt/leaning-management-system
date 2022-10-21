package swp490.g23.onlinelearningsystem.entities.class_setting.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSettingFilter {
    private List<ClassSettingFilterValue> typeFilter;
    private List<String> classFilter;
    private List<StatusEntity> statusFilter;
    private List<String> issueType;
    private List<String> issueStatus;
}
