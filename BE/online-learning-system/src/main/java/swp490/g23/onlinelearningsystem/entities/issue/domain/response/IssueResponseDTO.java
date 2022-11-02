package swp490.g23.onlinelearningsystem.entities.issue.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueResponseDTO {
    String title;
    
    String milestoneTitle;

    String type;

    String asigneeName;

    String deadline;

    String status;
}
