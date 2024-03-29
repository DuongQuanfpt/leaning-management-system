package swp490.g23.onlinelearningsystem.entities.milestone.domain;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.milestone_eval.domain.MilestoneEval;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;
import swp490.g23.onlinelearningsystem.enums.MilestoneStatusEnum;

@Entity
@Table(name = "milestone")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Milestone extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long milestoneId;

    @ManyToOne
    @JoinColumn(name = "ass_id", unique = true)
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "class_id")
    private Classes classes;

    @Column
    private LocalDate fromDate;

    @Column
    private LocalDate toDate;

    @Column
    private String title;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column
    private MilestoneStatusEnum status;

    @OneToMany(mappedBy = "milestone")
    private List<Submit> submits;

    @OneToMany(mappedBy = "milestone")
    private List<EvalCriteria> criteriaList;

    @OneToMany(mappedBy = "milestone")
    private List<Issue> issues;

    @OneToMany(mappedBy = "milestone")
    private List<SubmitWork> submitWorks;

    @OneToMany(mappedBy = "milestone")
    private List<WorkEval> workEvals;

    @OneToMany(mappedBy = "milestone")
    private List<MilestoneEval> milestoneEvals;

    @OneToMany(mappedBy = "milestone")
    private List<WorkUpdate> updates = new ArrayList<>();

}
