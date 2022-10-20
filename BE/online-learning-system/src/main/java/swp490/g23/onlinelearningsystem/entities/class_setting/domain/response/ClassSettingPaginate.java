package swp490.g23.onlinelearningsystem.entities.class_setting.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.filter.ClassSettingFilterValue;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassSettingPaginate {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<ClassSettingResponseDTO> listResult;
    private List<ClassSettingFilterValue> typeFilter;
    private List<String> classFilter; 
    private List <StatusEntity> statusFilter;
}
