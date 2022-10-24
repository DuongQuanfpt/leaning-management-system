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

    public CriteriaQuery searchFilterCriteria(String keyword, String filterStatus) {
        StringBuilder query = new StringBuilder("SELECT e FROM EvalCriteria e WHERE 1=1 ");

        if (keyword != null) {
            query.append(" AND (e.criteriaName LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            query.append(" AND e.status = '" + filterStatus + "'");
        }

        // if (filterSubject != null) {
        // query.append(" AND a.forSubject.subjectCode = '" + filterSubject + "'");
        // }

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
