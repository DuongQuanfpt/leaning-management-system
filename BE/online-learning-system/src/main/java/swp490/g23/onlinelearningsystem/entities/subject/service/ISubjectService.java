package swp490.g23.onlinelearningsystem.entities.subject.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.subject.domain.filter.SubjectFilter;
import swp490.g23.onlinelearningsystem.entities.subject.domain.request.SubjectRequestDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponseDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;

public interface ISubjectService {
   ResponseEntity<SubjectResponsePaginateDTO> getSubject(int limit, int page);

   ResponseEntity<SubjectResponsePaginateDTO> getSubject2(int limit, int page, String keyword ,String managerFilter, String expertFilter, String statusFilter);

   ResponseEntity<SubjectResponseDTO> getSubjectDetail(Long id);

   ResponseEntity<String> editSubject(Long id, SubjectRequestDTO dto);

   ResponseEntity<String> editSubjectStatus(Long id);

   ResponseEntity<SubjectFilter> subjectFilter();
}
