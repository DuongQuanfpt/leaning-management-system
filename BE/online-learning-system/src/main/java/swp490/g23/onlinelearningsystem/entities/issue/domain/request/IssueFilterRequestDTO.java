package swp490.g23.onlinelearningsystem.entities.issue.domain.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueFilterRequestDTO {

    List<String> assigneeNames;

    List<Long> groupIds;

    List<Long> typeIds;

    List<Long> statusIds;

    List<Long> requirementIds;
}
