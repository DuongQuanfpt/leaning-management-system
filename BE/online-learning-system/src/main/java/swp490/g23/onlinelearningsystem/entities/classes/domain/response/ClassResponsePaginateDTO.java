package swp490.g23.onlinelearningsystem.entities.classes.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ClassStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ClassResponsePaginateDTO {
    private int page;
	private int totalPage;
	private long totalItem;
	private List<ClassResponseDTO> listResult = new ArrayList<>();
	private List<ClassTypeResponseDTO> termFilter;
	private List<ClassTypeResponseDTO> branchFilter;
	private List<String> trainerFilter;
	private List<String> supporterFilter;
	private List<ClassStatusEntity> statusFilter;
}
