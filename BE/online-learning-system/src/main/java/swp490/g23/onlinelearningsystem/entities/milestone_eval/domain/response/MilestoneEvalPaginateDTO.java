package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalPaginateDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private boolean isWorkEval;
    private List<MilestoneEvalResponseDTO> listResult;
}
