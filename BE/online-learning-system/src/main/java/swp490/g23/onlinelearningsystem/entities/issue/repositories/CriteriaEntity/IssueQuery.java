package swp490.g23.onlinelearningsystem.entities.issue.repositories.CriteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IssueQuery {
    TypedQuery<Issue> resultQuery;
    TypedQuery<Long> countQuery;
}
