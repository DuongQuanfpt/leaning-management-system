package swp490.g23.onlinelearningsystem.entities.subject.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubjectQuery {
    TypedQuery<Subject> resultQuery;
    TypedQuery<Long> countQuery;

}
