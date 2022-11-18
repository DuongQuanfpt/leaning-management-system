package swp490.g23.onlinelearningsystem.entities.work_eval.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;

public interface WorkEvalRepository extends JpaRepository<WorkEval, Long> {

}
