package swp490.g23.onlinelearningsystem.entities.subject.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.subject.domain.request.SubjectRequestDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponseDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;

public interface ISubjectService {
   ResponseEntity<SubjectResponsePaginateDTO> getSubject(int limit, int page);

   ResponseEntity<SubjectResponseDTO> getSubjectDetail(Long id);

   ResponseEntity<String> editSubject(Long id, SubjectRequestDTO dto);

   ResponseEntity<String> editSubjectStatus(Long id);
}
