package swp490.g23.onlinelearningsystem.entities.milestone.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalDTO implements Comparable<MilestoneEvalDTO>{
    private Long submitId;

    private String userName;

    private String fullName;

    private Long groupId;

    private Double grade;
    
    private Double bonusGrade;

    private String comment;

    private boolean isTrainee;

    @Override
    public int compareTo(MilestoneEvalDTO arg0) {
        if(getGroupId() == null || arg0.getGroupId() == null) {
            return 0;
        }
        return getGroupId().compareTo(arg0.getGroupId());
    }


}
