package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaPaginateResponseDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<Status> statusFilter;
}
