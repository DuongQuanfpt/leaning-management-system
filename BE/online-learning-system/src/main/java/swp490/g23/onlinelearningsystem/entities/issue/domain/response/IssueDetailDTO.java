package swp490.g23.onlinelearningsystem.entities.issue.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueMilestoneFilterDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueDetailDTO {
    Long issueId;

    String title;

    IssueMilestoneFilterDTO milestone;

    IssueGroupDTO group;

    IssueSettingDTO type;

    IssueUserDTO asignee;

    String deadline;

    IssueSettingDTO status;

    String classCode;

    String description;

    IssueViewDTO requirement;

    List<IssueViewDTO> linkedIssues;

}
