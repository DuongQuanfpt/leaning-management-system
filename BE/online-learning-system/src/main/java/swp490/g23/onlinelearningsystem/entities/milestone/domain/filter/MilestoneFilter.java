package swp490.g23.onlinelearningsystem.entities.milestone.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.MilestoneStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneFilter {
    private List<String> subjectFilter;
    private List<MilestoneStatusEntity> statusFilter;
    private List<MilestoneFilterValue> assFilter;
    private List<String> classCode;
    private List<String> complexity;
}
