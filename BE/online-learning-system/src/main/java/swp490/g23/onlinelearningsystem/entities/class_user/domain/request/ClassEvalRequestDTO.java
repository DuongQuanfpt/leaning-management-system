package swp490.g23.onlinelearningsystem.entities.class_user.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassEvalRequestDTO {
    private String accountName;

    private Double gpa;

    private Double ongoing;

    private Double finalEval;
}
