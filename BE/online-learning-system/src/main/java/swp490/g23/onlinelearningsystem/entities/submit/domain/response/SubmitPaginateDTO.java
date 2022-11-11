package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitPaginateDTO {
    private int page;
    private int totalPage;
    private long totalItem;
    private List<SubmitResponseDTO> listResult = new ArrayList<>();
}
