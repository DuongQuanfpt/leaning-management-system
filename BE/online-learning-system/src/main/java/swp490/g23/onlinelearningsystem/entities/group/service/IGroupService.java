package swp490.g23.onlinelearningsystem.entities.group.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IGroupService {
    ResponseEntity<GroupPaginateDTO> getGroup(int limit, int page, String keyword, String filterActive,
            String filterMilestone, User user);
}
