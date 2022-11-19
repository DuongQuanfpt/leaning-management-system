package swp490.g23.onlinelearningsystem.entities.eval_detail.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.eval_detail.domain.EvalDetail;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CriteriaDetailQuery {
    TypedQuery<EvalDetail> resultQuery;
    TypedQuery<Long> countQuery;
}
