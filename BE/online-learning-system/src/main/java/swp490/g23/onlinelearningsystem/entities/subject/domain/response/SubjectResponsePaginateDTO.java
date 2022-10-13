package swp490.g23.onlinelearningsystem.entities.subject.domain.response;

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
public class SubjectResponsePaginateDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<SubjectResponseDTO> listResult = new ArrayList<>();
    private List<String> managerFilter;
    private List<String> expertFilter;
    private List <StatusEntity> statusFilter;
}
