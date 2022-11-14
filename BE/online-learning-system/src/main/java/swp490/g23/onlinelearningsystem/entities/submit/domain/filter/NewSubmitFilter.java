package swp490.g23.onlinelearningsystem.entities.submit.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NewSubmitFilter {
    
    String currentSubmitUrl;
    String lastSubmit;
    String status;
    String milestone;
    Long milestoneId;
    Long groupId;
    String groupCode;
    List<SubmitSettingFilterDTO> requirementStatus;
    List<SubmitRequirementFilter> requirement;
    List<SubmitMemberFilterDTO> assigneeOfGroup;
    List<SubmitFilterMilestoneDTO> milestoneOfGroup;

}
