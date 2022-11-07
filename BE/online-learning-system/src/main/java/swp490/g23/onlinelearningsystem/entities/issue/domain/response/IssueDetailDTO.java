package swp490.g23.onlinelearningsystem.entities.issue.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueDetailDTO {
    Long issueId;

    String title;

    IssueMilestoneDTO milestone;

    IssueGroupDTO group;

    IssueSettingDTO type;

    IssueUserDTO asignee;

    String deadline;

    IssueSettingDTO status;

    String classCode;

    String description;

    IssueRequirementDTO requirement;

}
