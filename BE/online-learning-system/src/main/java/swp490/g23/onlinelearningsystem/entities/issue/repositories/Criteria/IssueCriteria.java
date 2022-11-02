package swp490.g23.onlinelearningsystem.entities.issue.repositories.Criteria;

import javax.persistence.EntityManager;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class IssueCriteria {
    private final EntityManager em;
}
