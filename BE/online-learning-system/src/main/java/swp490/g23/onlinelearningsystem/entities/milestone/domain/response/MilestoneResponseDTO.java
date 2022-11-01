package swp490.g23.onlinelearningsystem.entities.milestone.domain.response;

import java.util.List;

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

    private boolean isTeamWork;

    private String classesCode;

    private int classesSize;

    private String fromDate;

    private String toDate;

    private String title;

    private String description;

    private String status;

    private List<MilestoneGroupDTO> groups;

    private List<MilestoneNoGroupDTO>noGroup;
}
