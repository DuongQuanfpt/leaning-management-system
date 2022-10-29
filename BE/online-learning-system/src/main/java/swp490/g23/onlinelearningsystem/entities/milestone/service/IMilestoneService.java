package swp490.g23.onlinelearningsystem.entities.milestone.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.milestone.domain.filter.MilestoneFilter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.request.MilestoneRequestDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestonePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IMilestoneService {
    ResponseEntity<MilestonePaginateDTO> displayMilestone(String keyword, int limit, int page, String filterClass,
            String filterAss, String filterStatus, User user);

    ResponseEntity<MilestoneResponseDTO> milestoneDetail(Long id);

    ResponseEntity<MilestoneFilter> milestoneFilter(Long id);

    ResponseEntity<String> milestonAdd(MilestoneRequestDTO dto);

    ResponseEntity<String> milestonEdit(MilestoneRequestDTO dto, Long id);

    ResponseEntity<String> milestoneInProgess(Long id);

    ResponseEntity<String> milestoneClosed(Long id);
}
