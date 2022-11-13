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
    String title;
    String status;
    String milestone;
    String assignee;
    boolean isSubmitted;
    Long id;
}
