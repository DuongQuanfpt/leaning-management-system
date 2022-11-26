package swp490.g23.onlinelearningsystem.entities.submit.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;

@Entity
@Table(name = "submit_tbl")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Submit extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long submitId;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "class_id", referencedColumnName = "class_id"),
            @JoinColumn(name = "user_Id", referencedColumnName = "user_Id")
    })
    private ClassUser classUser;

    @Column
    private String submitFileUrl;

    @Column
    private LocalDateTime submitTime;

    @Column
    private String userNote;

    @Column
    private SubmitStatusEnum status;

    @OneToMany(mappedBy = "submit")
    private List<SubmitWork> submitWorks;

    @OneToMany(mappedBy = "submit")
    private List<MilestoneEval> milestoneEvals;

    @OneToMany(mappedBy = "submit")
    private List<WorkUpdate> updates = new ArrayList<>();

}
