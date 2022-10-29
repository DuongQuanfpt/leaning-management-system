package swp490.g23.onlinelearningsystem.entities.group.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupMilestoneDTO {
    private Long milestoneId;

    private String title;

    private String classesCode;

    private String fromDate;

    private String toDate;

    private String description;

    private String status;
    
}
