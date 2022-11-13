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
public class IssueMultiRequestDTO {
    List<IssueRequestDTO> issues;
}
