package swp490.g23.onlinelearningsystem.entities.group.domain.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupRequestWrapper {
    List<GroupRequestDTO> listGroup;
}
