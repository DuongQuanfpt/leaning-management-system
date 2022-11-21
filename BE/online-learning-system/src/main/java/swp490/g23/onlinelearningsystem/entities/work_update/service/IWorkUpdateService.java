package swp490.g23.onlinelearningsystem.entities.work_update.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.request.WorkUpdateRequestDTo;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.response.WorkUpdateWorkDTO;

public interface IWorkUpdateService {
    ResponseEntity<WorkUpdateWorkDTO> getWorkUpdate(Long submitId, Long workId, User user);
    ResponseEntity<String> addWorkUpdate(Long submitId, Long workId, User user , WorkUpdateRequestDTo requestDTo);
    ResponseEntity<String> editWorkUpdate(Long updateId, User user , WorkUpdateRequestDTo requestDTo);
}
