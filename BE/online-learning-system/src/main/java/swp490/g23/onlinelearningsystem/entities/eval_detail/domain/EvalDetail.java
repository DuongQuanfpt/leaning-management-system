package swp490.g23.onlinelearningsystem.entities.eval_detail.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalDetail extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long evalDetailId;

    private Long totalLoc;

    private Double grade;

    private String comment;

    @ManyToOne
    private EvalCriteria evalCriteria;

    @ManyToOne
    private MilestoneEval milestoneEval;
}
