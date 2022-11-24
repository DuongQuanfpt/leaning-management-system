package swp490.g23.onlinelearningsystem.entities.milestone_eval.domain;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.eval_detail.domain.EvalDetail;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneEval extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long milestoneEvalId;

    private Double bonus;

    private Double grade;

    private String comment;

    @OneToMany(mappedBy = "milestoneEval")
    private List<EvalDetail> evalDetails;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "submit_id")
    private Submit submit;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "class_id", referencedColumnName = "class_id"),
            @JoinColumn(name = "user_Id", referencedColumnName = "user_Id")
    })
    private ClassUser classUser;
}
