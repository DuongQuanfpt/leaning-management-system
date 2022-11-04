package swp490.g23.onlinelearningsystem.entities.issue.domain.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueRequestDTO {
    String title;
    
    Long milestoneId;

    Long typeId;

    Long groupId;

    String asigneeName;

    String deadline;

    Long statusId;

    String description;

}
