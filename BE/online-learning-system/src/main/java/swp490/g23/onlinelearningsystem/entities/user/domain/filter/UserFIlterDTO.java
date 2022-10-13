package swp490.g23.onlinelearningsystem.entities.user.domain.filter;

import java.util.List;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.user.domain.response.UserTypeResponseDTO;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.UserStatusEntity;

@Getter
@Setter
@NoArgsConstructor


public class UserFilterDTO {
    List <UserTypeResponseDTO> RoleFilter;
    List <UserStatusEntity> StatusFilter;
}
