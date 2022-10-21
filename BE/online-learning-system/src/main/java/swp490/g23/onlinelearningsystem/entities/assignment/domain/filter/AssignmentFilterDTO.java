package swp490.g23.onlinelearningsystem.entities.assignment.domain.filter;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentFilterDTO {
    private List<StatusEntity> statusFilter;
    private List<String> subjectFilter;
}
