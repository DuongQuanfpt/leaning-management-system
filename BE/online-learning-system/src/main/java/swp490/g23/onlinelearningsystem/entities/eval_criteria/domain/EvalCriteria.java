package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.eval_detail.domain.EvalDetail;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalCriteria extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long criteriaId;

    private String criteriaName;

    private boolean isTeamEval;

    private boolean isWorkEval;

    @Column(name = "eval_weight", nullable = false)
    private Double evalWeight;

    private Long expectedWork;

    private String description;

    private Status status;

    @ManyToOne
    @JoinColumn(name = "ass_id")
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;

    @OneToMany(mappedBy = "evalCriteria")
    private List<EvalDetail> evalDetails;
}
