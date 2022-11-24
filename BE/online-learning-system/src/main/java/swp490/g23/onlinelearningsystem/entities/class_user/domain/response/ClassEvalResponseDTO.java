package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassEvalResponseDTO {

    private Integer stt;

    private String userName;

    private String fullName;

    private Long gpa;

    private Long ongoing;

    private Long finalEval;

    private String comment;
}
