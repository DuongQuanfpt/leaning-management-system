package swp490.g23.onlinelearningsystem.entities.milestone.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneResponseDTO {
    private Long milestoneId;

    private AssignmentResponseDTO assignment;

    private String classesCode;

    private String fromDate;

    private String toDate;

    private String title;

    private String description;

    private String status;
}