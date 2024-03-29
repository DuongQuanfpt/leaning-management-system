package swp490.g23.onlinelearningsystem.entities.setting.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.TypeResponseDTO;
import swp490.g23.onlinelearningsystem.enums.enumentities.StatusEntity;

@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SettingFilterDTO {
    List <TypeResponseDTO> TypeFilter;
    List <StatusEntity> StatusFilter;

}
