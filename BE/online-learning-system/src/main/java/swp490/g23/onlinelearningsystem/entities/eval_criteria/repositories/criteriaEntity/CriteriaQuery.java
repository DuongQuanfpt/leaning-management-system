package swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaQuery {
    TypedQuery<EvalCriteria> resultQuery;
    TypedQuery<Long> countQuery;
}
