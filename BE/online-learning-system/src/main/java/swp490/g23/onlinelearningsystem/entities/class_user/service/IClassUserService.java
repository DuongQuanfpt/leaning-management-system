package swp490.g23.onlinelearningsystem.entities.class_user.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.response.TraineeResponsePaginateDTP;

public interface IClassUserService {
    ResponseEntity<TraineeResponsePaginateDTP> displayTrainee(int limit, int currentPage, String keyword, String filterClass, String filterStatus);
}
