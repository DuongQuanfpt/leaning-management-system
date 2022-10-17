package swp490.g23.onlinelearningsystem.entities.classes.domain.response;


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

    private String subjectCode;

    private ClassTypeResponseDTO term;

    private ClassTypeResponseDTO branch;

    private String description;

    private String trainer;

    private String supporter;
}
