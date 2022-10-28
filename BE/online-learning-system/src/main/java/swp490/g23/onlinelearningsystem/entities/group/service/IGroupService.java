package swp490.g23.onlinelearningsystem.entities.group.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.group.domain.filter.GroupFilter;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupRequestDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IGroupService {
    ResponseEntity<GroupPaginateDTO> getGroup(int limit, int page, String keyword, String filterActive,
            String filterMilestone, User user);

    ResponseEntity<GroupResponseDTO> groupDetail(Long id);
    ResponseEntity<String> editGroup(Long id, Long milestoneId ,GroupRequestDTO dto);
    ResponseEntity<GroupFilter> groupFilter();
    ResponseEntity<String> groupCreate(Long milestoneId,GroupRequestDTO dto);
    ResponseEntity<String> groupDetach(Long id , Long milestoneId);
    ResponseEntity<String> groupRemoveAll(Long milestoneId);
    ResponseEntity<String> groupStatus(Long groupId);
    
    
}
