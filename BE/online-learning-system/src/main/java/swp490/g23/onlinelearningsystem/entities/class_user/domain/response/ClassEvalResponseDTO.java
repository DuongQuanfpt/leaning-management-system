package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;

import java.util.List;

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

    private Double gpa;

    private Double ongoing;

    private Double finalEval;

    private String comment;

    private List<AssignmentGradeDTO> assignmentGrade;
}
