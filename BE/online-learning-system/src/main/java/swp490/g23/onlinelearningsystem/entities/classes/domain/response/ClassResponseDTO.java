package swp490.g23.onlinelearningsystem.entities.classes.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassStatus;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassResponseDTO {
    private Long classId;

    private String code;

    private ClassStatus status;

    private List<String> subject;

    private String term;

    private String branch;

    private String description;

    private String trainer;

    private String supporter;
}
