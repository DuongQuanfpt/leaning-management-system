package swp490.g23.onlinelearningsystem.entities.group.repositories.criteria_entity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GroupQuery {
    TypedQuery<Group> resultQuery;
    TypedQuery<Long> countQuery;

}
