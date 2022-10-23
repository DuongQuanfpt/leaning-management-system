package swp490.g23.onlinelearningsystem.entities.milestone.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneRequestDTO {
  
    private Long milestoneId;

    private Long assignmentId;

    private String classesCode;

    private String fromDate;

    private String toDate;

    private String title;

    private String description;

    private String status;
}
