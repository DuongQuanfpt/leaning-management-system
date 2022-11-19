package swp490.g23.onlinelearningsystem.entities.milestone_eval.repositories.criteria_entity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEvalQuery {
    TypedQuery<MilestoneEval> resultQuery;
    TypedQuery<Long> countQuery;
}
