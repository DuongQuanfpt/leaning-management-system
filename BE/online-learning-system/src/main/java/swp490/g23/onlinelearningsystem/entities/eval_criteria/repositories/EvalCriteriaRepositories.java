package swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;

public interface EvalCriteriaRepositories extends JpaRepository<EvalCriteria, Long> {

}
