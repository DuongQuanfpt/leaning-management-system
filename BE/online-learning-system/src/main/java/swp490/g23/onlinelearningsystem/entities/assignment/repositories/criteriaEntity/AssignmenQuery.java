package swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmenQuery {
    TypedQuery<Assignment> resultQuery;
    TypedQuery<Long> countQuery;
}
