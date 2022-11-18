package swp490.g23.onlinelearningsystem.entities.work_eval.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.request.EvalRequestDTO;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.response.EvalResponseDTO;

public interface IWorkEvalService {
    ResponseEntity<EvalResponseDTO> getWorkEval(User user , Long submitId , Long workId);
    ResponseEntity<String> workEval(User user , Long submitId , Long workId,EvalRequestDTO requestDTO);
    ResponseEntity<String> workReject(User user , Long submitId , Long workId,EvalRequestDTO requestDTO);
}
