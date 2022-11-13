package swp490.g23.onlinelearningsystem.entities.submit_work.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Entity
@Table(name = "submit_work")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitWork extends BaseEntity {
    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private SubmitWorkKey permissionId = new SubmitWorkKey();

    @ManyToOne()
    @MapsId("issueId")
    @JoinColumn(name = "work_id")
    private Issue work;

    @ManyToOne
    @MapsId("submitId")
    @JoinColumn(name = "submit_id")
    private Submit submit;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;

    @Column
    private String rejectReason;

    @Column
    private SubmitWorkStatusEnum status;

    @OneToMany(mappedBy = "submitWork")
    private List<WorkEval> workEvals;
}
