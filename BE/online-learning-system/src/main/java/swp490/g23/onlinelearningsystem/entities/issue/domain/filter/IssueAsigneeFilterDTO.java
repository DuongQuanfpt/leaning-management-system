package swp490.g23.onlinelearningsystem.entities.issue.domain.filter;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueAsigneeFilterDTO {
    Long traineeId;
    String username;   
}