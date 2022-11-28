package swp490.g23.onlinelearningsystem.entities.assignment.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.enumentities.StatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentPaginate {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<AssignmentResponseDTO> listResult = new ArrayList<>();
    private List<String> subjectFilter = new ArrayList<>();
    private List<StatusEntity> StatusFilter = new ArrayList<>();
  
}
