package swp490.g23.onlinelearningsystem.entities.setting.domain.response;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SettingResponsePaginateDTO {
    private int page;
	private int totalPage;
	private List<SettingResponseDTO> listResult = new ArrayList<>();
}
