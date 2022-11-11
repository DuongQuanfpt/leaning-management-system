package swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmitQuery {
    TypedQuery<Submit> resultQuery;
    TypedQuery<Long> countQuery;
}
