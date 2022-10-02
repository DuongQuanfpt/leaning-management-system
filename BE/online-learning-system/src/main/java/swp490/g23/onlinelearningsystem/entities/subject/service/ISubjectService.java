package swp490.g23.onlinelearningsystem.entities.subject.service;


import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;

public interface ISubjectService {
   ResponseEntity<SubjectResponsePaginateDTO> getSubject(int limit , int page);
}
