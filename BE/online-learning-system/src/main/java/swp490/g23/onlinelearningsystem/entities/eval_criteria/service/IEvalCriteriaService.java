package swp490.g23.onlinelearningsystem.entities.eval_criteria.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.filter.CriteriaFilterDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.request.CriteriaRequestDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaPaginateResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaResponseDTO;

public interface IEvalCriteriaService {

    ResponseEntity<CriteriaPaginateResponseDTO> getCriteria(int limit, int page, String keyword, String statusFilter);

    ResponseEntity<String> updateStatus(Long criteriaId);

    ResponseEntity<CriteriaResponseDTO> viewCriteria(Long criteriaId);

    ResponseEntity<String> updateCriteria(Long criteriaId, CriteriaRequestDTO dto);

    ResponseEntity<String> addCriteria(CriteriaRequestDTO dto);

    ResponseEntity<CriteriaFilterDTO> getFilter();
}
