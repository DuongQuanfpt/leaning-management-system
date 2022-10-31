package swp490.g23.onlinelearningsystem.entities.group.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.group.domain.filter.GroupFilter;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupRequestDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.request.GroupSetWrapper;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupClassDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.group.domain.response.GroupResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IGroupService {
    ResponseEntity<GroupPaginateDTO> getGroup(int limit, int page, String keyword, String filterActive,
            String filterMilestone, User user);

    ResponseEntity<GroupResponseDTO> groupDetail(Long id);
    ResponseEntity<String> editGroup(Long id ,GroupRequestDTO dto);
    ResponseEntity<GroupFilter> groupFilter(Long userId , String classCode);
    ResponseEntity<GroupClassDTO> groupSetFilter(Long id);
    ResponseEntity<String> groupCreate(Long milestoneId,GroupRequestDTO dto ,String memberName);
    ResponseEntity<String> groupDetach(Long id , Long milestoneId);
    ResponseEntity<String> groupRemoveAll(Long milestoneId);
    ResponseEntity<String> groupStatus(Long groupId);
    ResponseEntity<String> groupSet(Long milestoneId , GroupSetWrapper requestDto);
    ResponseEntity<String> reuseGroupSet(Long milestoneId , Long forMilestoneId);
    ResponseEntity<String> cloneGroupSet(Long milestoneId , Long forMilestoneId);
    ResponseEntity<List<MilestoneResponseDTO>> reuseGroupSetFilter(Long milestoneId);
    
}
