package swp490.g23.onlinelearningsystem.entities.milestone_eval.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;

public interface MilestoneEvalRepository extends JpaRepository<MilestoneEval,Long> {
    
}
