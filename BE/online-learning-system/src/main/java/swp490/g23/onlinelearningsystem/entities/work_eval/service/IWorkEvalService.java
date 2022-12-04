package swp490.g23.onlinelearningsystem.entities.work_eval.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.request.EvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalResponseDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.NewEvalResponseDTO;

public interface IWorkEvalService {
    ResponseEntity<EvalResponseDTO> getWorkEval(User user , Long submitId , Long workId);
    ResponseEntity<NewEvalResponseDTO> workEval(User user , Long submitId , Long workId,EvalRequestDTO requestDTO , Long milestoneId);
    ResponseEntity<String> workReject(User user , Long submitId , Long workId,EvalRequestDTO requestDTO);
}
