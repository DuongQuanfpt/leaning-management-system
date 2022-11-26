package swp490.g23.onlinelearningsystem.entities.milestone.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalDTO {
    private Long submitId;

    private String userName;

    private String fullName;

    private Long groupId;

    private Double grade;
    
    private Double bonusGrade;

    private String comment;


}
