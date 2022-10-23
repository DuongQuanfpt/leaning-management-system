package swp490.g23.onlinelearningsystem.entities.eval_criteria.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.filter.CriteriaFilterDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.request.CriteriaRequestDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaPaginateResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.response.CriteriaResponseDTO;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.EvalCriteriaRepositories;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.service.IEvalCriteriaService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Service
public class EvalCriteriaService implements IEvalCriteriaService {

    @Autowired
    private EvalCriteriaRepositories criteriaRepositories;

    @Override
    public ResponseEntity<CriteriaPaginateResponseDTO> getCriteria(int limit, int page, String keyword,
            String statusFilter) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<String> updateStatus(Long criteriaId) {
        EvalCriteria evalCriteria = criteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        if (evalCriteria.getStatus() == Status.Active) {
            evalCriteria.setStatus(Status.Inactive);
        } else {
            evalCriteria.setStatus(Status.Active);
        }
        criteriaRepositories.save(evalCriteria);
        return ResponseEntity.ok("Status update successfully");
    }

    @Override
    public ResponseEntity<CriteriaResponseDTO> viewCriteria(Long criteriaId) {
        EvalCriteria evalCriteria = criteriaRepositories.findById(criteriaId).get();
        if (evalCriteria == null) {
            throw new CustomException("Criteria doesn't exist!");
        }
        return ResponseEntity.ok(toDTO(evalCriteria));
    }

    @Override
    public ResponseEntity<String> updateCriteria(Long assId, CriteriaRequestDTO dto) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<String> addCriteria(CriteriaRequestDTO dto) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<CriteriaFilterDTO> getFilter() {
        // TODO Auto-generated method stub
        return null;
    }

    public CriteriaResponseDTO toDTO(EvalCriteria entity) {
        CriteriaResponseDTO responseDTO = new CriteriaResponseDTO();

        responseDTO.setCriteriaId(entity.getCriteriaId());
        responseDTO.setCriteriaName(entity.getCriteriaName());
        responseDTO.setDescription(entity.getDescription());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setEvalWeight(entity.getEvalWeight());
        responseDTO.setExpectedWork(entity.getExpectedWork());
        responseDTO.setIsTeamEval(entity.isTeamEval() ? 1 : 0);

        return responseDTO;
    }
}
