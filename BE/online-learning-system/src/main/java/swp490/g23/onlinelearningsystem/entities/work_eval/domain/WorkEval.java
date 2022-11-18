package swp490.g23.onlinelearningsystem.entities.work_eval.domain;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkEval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workEvalId;

    private String comment;

    private long workEval;

    private long newWorkEval;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "work_id", referencedColumnName = "work_id"),
            @JoinColumn(name = "submit_id", referencedColumnName = "submit_id")
    })
    private SubmitWork submitWork;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "complexity_id")
    private SubjectSetting complexity;

    @ManyToOne
    @JoinColumn(name = "quality_id")
    private SubjectSetting quality;

    @ManyToOne
    @JoinColumn(name = "new_complexity_id")
    private SubjectSetting newComplexity;

    @ManyToOne
    @JoinColumn(name = "new_quality_id")
    private SubjectSetting newQuality;
}
