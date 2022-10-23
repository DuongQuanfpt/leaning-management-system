package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response;

import java.util.ArrayList;
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
public class CriteriaPaginateResponseDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<CriteriaResponseDTO> listResult = new ArrayList<>();
    private List<StatusEntity> statusFilter;
}
