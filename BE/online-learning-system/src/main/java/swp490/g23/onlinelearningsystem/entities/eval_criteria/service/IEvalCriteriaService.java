package swp490.g23.onlinelearningsystem.entities.eval_criteria.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.filter.CriteriaFilterDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.request.CriteriaRequestDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaPaginateResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaResponseDTO;

public interface IEvalCriteriaService {

        ResponseEntity<CriteriaPaginateResponseDTO> getCriteria(int limit, int page, String keyword,
                        String statusFilter,
                        String assignmentFilter, String classCode);

        ResponseEntity<String> updateStatus(Long criteriaId);

        ResponseEntity<CriteriaResponseDTO> viewCriteria(Long criteriaId);

        ResponseEntity<String> updateCriteria(Long criteriaId, CriteriaRequestDTO dto);

        ResponseEntity<String> addCriteria(CriteriaRequestDTO dto);

        ResponseEntity<CriteriaFilterDTO> getFilter(String classCode);

        ResponseEntity<CriteriaPaginateResponseDTO> getClassCriteria(int limit, int page, String keyword,
                        String statusFilter,
                        String classFilter, String milestoneFilter, Long userId);

        ResponseEntity<String> updateClassCriteriaStatus(Long criteriaId);

        ResponseEntity<CriteriaResponseDTO> viewClassCriteria(Long criteriaId);

        ResponseEntity<String> updateClassCriteria(Long criteriaId, CriteriaRequestDTO dto);

        ResponseEntity<String> addClassCriteria(CriteriaRequestDTO dto);
}
