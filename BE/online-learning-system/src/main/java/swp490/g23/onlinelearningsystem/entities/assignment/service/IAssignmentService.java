package swp490.g23.onlinelearningsystem.entities.assignment.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentPaginate;

public interface IAssignmentService {
    ResponseEntity<AssignmentPaginate> getAssignment(int limit, int page, String keyword, String subjectFilter,
            String statusFilter);

    ResponseEntity<String> updateStatus(Long assId);
}
