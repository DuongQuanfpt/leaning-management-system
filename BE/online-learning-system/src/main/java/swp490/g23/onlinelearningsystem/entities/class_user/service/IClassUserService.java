package swp490.g23.onlinelearningsystem.entities.class_user.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.filter.TraineeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.ClassEvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.request.TraineeRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.ClassEvalPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeImportResponse;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;

public interface IClassUserService {
        ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(int limit, int currentPage, String keyword,
                        String filterClass, Long statusValue, Long userId);

        ResponseEntity<TraineeFilterDTO> getFilter();

        ResponseEntity<List<TraineeImportResponse>> traineeImport(List<TraineeRequestDTO> requestDTO, String classCode);

        ResponseEntity<String> updateStatus(Long userId, String classCode);

        ResponseEntity<String> setDropout(Long userId, String classCode, TraineeRequestDTO dto);

        ResponseEntity<TraineeResponseDTO> viewTrainee(Long userId, String classCode);

        ResponseEntity<String> updateTrainee(Long userId, String classCode, TraineeRequestDTO dto);

        ResponseEntity<ClassEvalPaginateDTO> classEvalList(int limit, int currentPage, String keyword,
                        String filterAssignment,
                        Long userId, String classCode);

        ResponseEntity<String> updateEval(List<ClassEvalRequestDTO> requestDTOs, String classCode);

        ResponseEntity<String> generateMark(List<ClassEvalRequestDTO> requestDTOs, String classCode);

        ResponseEntity<String> addTrainee(TraineeRequestDTO dto, String classCode);
}
