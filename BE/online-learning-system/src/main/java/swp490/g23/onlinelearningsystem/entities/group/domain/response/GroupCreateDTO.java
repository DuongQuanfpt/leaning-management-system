package swp490.g23.onlinelearningsystem.entities.group.domain.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupCreateDTO {
    Long groupId;
    String groupCode;
    List<String> members;
}
