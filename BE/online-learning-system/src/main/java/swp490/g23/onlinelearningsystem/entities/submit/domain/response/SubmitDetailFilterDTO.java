package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.SubmitWorkStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitDetailFilterDTO {
    private List<SubmitDetailDTO> listResult = new ArrayList<>();
    private List<SubmitWorkStatusEntity> statusFilter = new ArrayList<>();
    private List<String> assigneeFilter = new ArrayList<>();
    private Long milestoneId;
}
