package swp490.g23.onlinelearningsystem.entities.work_eval.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;

public interface WorkEvalRepository extends JpaRepository<WorkEval, Long> {
    @Query(value = "SELECT wk FROM WorkEval wk WHERE wk.submitWork = :submitWork ")
    WorkEval getLatestEvalOfSubmitWork(SubmitWork submitWork);
}
