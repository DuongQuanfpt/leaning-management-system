package swp490.g23.onlinelearningsystem.entities.eval_criteria.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EvalCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long criteriaId;

    private String criteriaName;

    private boolean isTeamEval;

    private String evalWeight;

    private String expectedWork;

    private String description;

    private Status status;

    @ManyToOne
    @JoinColumn(name = "ass_id")
    private Assignment assignment;
}