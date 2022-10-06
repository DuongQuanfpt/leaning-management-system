package swp490.g23.onlinelearningsystem.entities.classes.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassResponseDTO {
    private Long classId;

    private String code;

    private Status status;

    private String packages;

    private String term;

    private String description;

    private String trainer;

    private String supporter;
}
