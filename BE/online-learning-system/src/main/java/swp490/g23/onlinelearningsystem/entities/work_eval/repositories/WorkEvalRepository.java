package swp490.g23.onlinelearningsystem.entities.work_eval.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;

public interface WorkEvalRepository extends JpaRepository<WorkEval, Long> {
    @Query(value = "DELETE FROM SubmitWork sk WHERE sk.submit = :submit ")
    WorkEval getLatestEvalOfSubmitWork(SubmitWork submitWork);
}
