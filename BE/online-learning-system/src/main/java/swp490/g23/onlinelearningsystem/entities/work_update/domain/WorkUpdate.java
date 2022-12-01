package swp490.g23.onlinelearningsystem.entities.work_update.domain;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;

@Entity
@Table(name = "work_update_tbl")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkUpdate extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workUpdateId;

    @ManyToOne
    @JoinColumn(name = "milestone_id")
    private Milestone milestone;

    @ManyToOne
    @JoinColumn(name = "submit_id")
    private Submit submit;

    @ManyToOne
    @JoinColumn(name = "requirement_id")
    private Issue requirement;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private LocalDate updateDate;
}
