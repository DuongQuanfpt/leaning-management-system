package swp490.g23.onlinelearningsystem.entities.submit.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitGroupDTO {
    private Long groupId;
    private  String groupCode;
    private List<String> members;
}
