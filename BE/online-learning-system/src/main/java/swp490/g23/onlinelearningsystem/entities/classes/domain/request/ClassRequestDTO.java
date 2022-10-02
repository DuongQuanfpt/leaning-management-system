package swp490.g23.onlinelearningsystem.entities.classes.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.EnumEntity.StatusEnum;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassRequestDTO {
    private Long classId;

    private String code;

    private StatusEnum status;

    private String description;

    private String trainer;
}
