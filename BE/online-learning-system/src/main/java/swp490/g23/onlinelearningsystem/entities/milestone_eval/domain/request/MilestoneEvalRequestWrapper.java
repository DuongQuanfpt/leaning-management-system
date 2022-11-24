package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalRequestWrapper {
    private List<MilestoneEvalRequestDTO> evalList;
}
