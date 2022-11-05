package swp490.g23.onlinelearningsystem.entities.issue.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueAsigneeDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueGroupDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueSettingDto;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueFilter {
    private List<IssueSettingDto> typeFilter;
    private List<IssueSettingDto> statusFilter;
    private List<String> asigneeFilter;
    private List<IssueGroupDTO> groupFilter;
    private List<IssueMilestoneDTO> milestoneFilter;
    private List<IssueFilterValue> requirement;
    private List<IssueAsigneeDTO> traineesToAsign;
}
