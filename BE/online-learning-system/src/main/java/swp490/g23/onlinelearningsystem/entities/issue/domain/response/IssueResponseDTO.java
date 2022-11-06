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
    Long issueId;

    String title;
    
    IssueMilestoneDTO milestone;
    
    IssueGroupDTO group;

    String type;

    IssueUserDTO asignee;

    IssueUserDTO author;

    IssueUserDTO modifiedBy;

    String deadline;

    String status;

    String classCode;

    String description;

    String requirement;

    String createdDate;

    String modifiedDate;
}
