package swp490.g23.onlinelearningsystem.entities.issue.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueFilter {
    private List<IssueSettingFilterDto> typeFilter;
    private List<IssueSettingFilterDto> statusFilter;
    private List<String> asigneeFilter;
    private List<IssueGroupFilterDTO> groupFilter;
    private List<IssueMilestoneFilterDTO> milestoneFilter;
    private List<IssueFilterValue> requirement;
    private List<String> traineesToAsign;
}
