package swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;
import swp490.g23.onlinelearningsystem.entities.assignment.repositories.criteriaEntity.AssignmenQuery;

@Repository
@RequiredArgsConstructor
public class AssignmentCriteria {
    private final EntityManager em;

    public AssignmenQuery searchFilterAssignment(String keyword, String filterStatus ,String filterSubject) {
        StringBuilder query = new StringBuilder("SELECT a FROM Assignment a WHERE 1=1 ");

        // if (keyword != null) {
        //     query.append(" AND s.subjectName LIKE '%" + keyword + "%' OR s.subjectCode LIKE '%" + keyword + "%'");
        // }

        // if (filterStatus != null) {
        //     query.append(" AND s.subjectStatus = '" + filterStatus + "'");
        // }

        // if (filterManager != null) {
        //     query.append(" AND s.manager.accountName = '" + filterManager + "'");
        // }

        // if (filterExpert != null) {
        //     query.append(" AND s.expert.accountName = '" + filterExpert + "'");
        // }
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT a", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Assignment> typedQuery = em.createQuery(query.toString(), Assignment.class);

        AssignmenQuery result = new AssignmenQuery(typedQuery,countQuery);
        return result;
    }
}
