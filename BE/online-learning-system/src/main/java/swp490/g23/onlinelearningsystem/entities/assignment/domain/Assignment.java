package swp490.g23.onlinelearningsystem.entities.assignment.domain;

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
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Table(name = "Assignment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Assignment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assId;

    @Column
    private String title;

    @Column
    private String assBody;

    @Column
    private String eval_weight;

    @Column
    private boolean isTeamWork;

    @Column
    private boolean isOnGoing;

    @Column
    private Status status;

    @ManyToOne
	@JoinColumn(name = "subject_id")
    private Subject forSubject;
}
