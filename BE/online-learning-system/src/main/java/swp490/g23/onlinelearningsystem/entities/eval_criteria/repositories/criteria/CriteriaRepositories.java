package swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteriaEntity.CriteriaQuery;

@Repository
@RequiredArgsConstructor
public class CriteriaRepositories {

    private final EntityManager em;

    public CriteriaQuery searchFilterCriteria(String keyword, String filterStatus, String filterAssignment,
            String classCode) {
        StringBuilder query = new StringBuilder(
                "SELECT e FROM EvalCriteria e WHERE e.assignment.forSubject.subjectStatus = '1' ");

        if (keyword != null) {
            query.append(" AND (e.criteriaName LIKE '%" + keyword + "%' OR e.assignment.title LIKE '%" + keyword
                    + "%' OR e.assignment.forSubject.subjectCode LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            query.append(" AND e.status = '" + filterStatus + "'");
        }

        if (filterAssignment != null) {
            query.append(" AND e.assignment.title = '" + filterAssignment + "'");
        }
        if (classCode != null) {
            query.append(" AND e.milestone.classes.code = '" + classCode + "' AND e.milestone IS NOT NULL");
        }
        // if (filterExpert != null) {
        // query.append(" AND s.expert.accountName = '" + filterExpert + "'");
        // }
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT e", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<EvalCriteria> typedQuery = em.createQuery(query.toString(), EvalCriteria.class);

        CriteriaQuery result = new CriteriaQuery(typedQuery, countQuery);
        return result;
    }
}
