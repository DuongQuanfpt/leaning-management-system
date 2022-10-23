package swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria_entity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MilestoneQuery {
    TypedQuery<Milestone> resultQuery;
    TypedQuery<Long> countQuery;
}
