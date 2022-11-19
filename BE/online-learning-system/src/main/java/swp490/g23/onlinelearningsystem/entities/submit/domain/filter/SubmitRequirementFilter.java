package swp490.g23.onlinelearningsystem.entities.submit.domain.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitRequirementFilter {
    Long id;
    Long groupId;
    String groupTitle;
    String title;
    String status;
    String submitStatus;
    String comment;
    String milestone;
    String assignee;
    boolean isSubmitted;
}
