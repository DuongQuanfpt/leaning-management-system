package swp490.g23.onlinelearningsystem.entities.classes.domain.response;

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
public class ClassResponsePaginateDTO {
    private int page;
	private int totalPage;
	private List<ClassResponseDTO> listResult = new ArrayList<>();
}
