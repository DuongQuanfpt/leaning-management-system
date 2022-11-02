package swp490.g23.onlinelearningsystem.entities.issue.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueListDTO {
    private int page;
	private int totalPage;
	private long totalItem;
    private List<IssueResponseDTO> issueList;
}
