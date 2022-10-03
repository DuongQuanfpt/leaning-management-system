package swp490.g23.onlinelearningsystem.entities.classes.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.EnumEntity.SettingStatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassResponseDTO {
    private Long classId;

    private String code;

    private SettingStatusEnum status;

    private String description;

    private String trainer;

    private String supporter;
}
