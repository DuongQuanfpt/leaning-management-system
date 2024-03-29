package swp490.g23.onlinelearningsystem.entities.class_user.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.enums.enumentities.TraineeStatusEntity;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TraineeResponsePaginateDTP {
    private int page;
	private int totalPage;
	private long totalItem;
	private List<TraineeResponseDTO> listResult = new ArrayList<>();
	private List<String> classFilter;
	private List<TraineeStatusEntity> statuFilter;
}
