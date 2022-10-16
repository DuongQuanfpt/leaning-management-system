package swp490.g23.onlinelearningsystem.entities.class_user.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.filter.TraineeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.TraineeRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;

public interface IClassUserService {
    ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(int limit, int currentPage, String keyword,
            String filterClass, String filterStatus, Long userId);

    ResponseEntity<TraineeFilterDTO> getFilter();

    ResponseEntity<String> addTrainee(List<TraineeRequestDTO> requestDTO);

    ResponseEntity<String> updateStatus(Long id);

    ResponseEntity<String> setDropout(Long id, TraineeRequestDTO dto);
}
