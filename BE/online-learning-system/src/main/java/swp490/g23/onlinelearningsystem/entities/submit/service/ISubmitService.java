package swp490.g23.onlinelearningsystem.entities.submit.service;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.NewSubmitFilter;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementWrapper;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitDetailDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface ISubmitService {
    ResponseEntity<SubmitPaginateDTO> displaySubmit(int limit, int page, String keyword, Long milestoneId,
            Long assignmentId, Long groupId, Long statusValue, User user, String classCode, boolean isGroup);

    ResponseEntity<SubmitFilterDTO> getSubmitListFilter(User user, String classCode, boolean isGroup);

    ResponseEntity<NewSubmitFilter> newSubmitFilter(User user, Long submitId);

    ResponseEntity<String> newSubmit(User user, Long submitId, SubmitRequirementWrapper requestDTO, MultipartFile file);

    ResponseEntity<List<SubmitDetailDTO>> viewSubmit(Long id);
}
