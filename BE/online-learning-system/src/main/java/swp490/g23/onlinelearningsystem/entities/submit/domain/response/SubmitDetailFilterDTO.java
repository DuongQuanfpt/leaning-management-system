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
    List<SubmitWorkStatusEntity> statusFilter = new ArrayList<>();
    List<String> teamFilter = new ArrayList<>();
    List<String> assigneeFilter = new ArrayList<>();
}
