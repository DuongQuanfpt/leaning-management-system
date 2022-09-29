package swp490.g23.onlinelearningsystem.entities.user.domain.filter;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserFIlterDTO {
    List <String> RoleFilter;
    List <String> StatusFilter;
}
