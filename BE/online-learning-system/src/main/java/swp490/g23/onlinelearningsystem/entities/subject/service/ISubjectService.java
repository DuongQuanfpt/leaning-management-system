package swp490.g23.onlinelearningsystem.entities.subject.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.subject.domain.filter.SubjectFilter;
import swp490.g23.onlinelearningsystem.entities.subject.domain.request.SubjectRequestDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponseDTO;
import swp490.g23.onlinelearningsystem.entities.subject.domain.response.SubjectResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface ISubjectService {

   ResponseEntity<SubjectResponsePaginateDTO> getSubject(int limit, int page, String keyword, String managerFilter,
         String expertFilter, String statusFilter, User user);

   ResponseEntity<SubjectResponseDTO> getSubjectDetail(Long id);

   ResponseEntity<String> editSubject(Long id, SubjectRequestDTO dto);

   ResponseEntity<String> editSubjectStatus(Long id);

   ResponseEntity<String> addSubject(SubjectRequestDTO dto);

   ResponseEntity<SubjectFilter> subjectFilter();
}
