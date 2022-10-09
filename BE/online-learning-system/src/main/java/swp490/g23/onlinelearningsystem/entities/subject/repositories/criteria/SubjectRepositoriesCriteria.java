package swp490.g23.onlinelearningsystem.entities.subject.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;

@Repository
@RequiredArgsConstructor
public class SubjectRepositoriesCriteria {
    private final EntityManager em;

    public TypedQuery<Subject> searchFilterSubject(String keyword, String filterStatus, String filterManager,
            String filterExpert) {
        StringBuilder query = new StringBuilder("SELECT s FROM Subject s WHERE 1=1 ");

        if (keyword != null) {
            query.append(" AND s.subjectName LIKE '%" + keyword + "%' OR s.subjectCode LIKE '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND s.subjectStatus = '" + filterStatus + "'");
        }

        if (filterManager != null) {
            query.append(" AND s.manager.accountName = '" + filterManager + "'");
        }

        if (filterExpert != null) {
            query.append(" AND s.expert.accountName = '" + filterExpert + "'");
        }

        TypedQuery<Subject> typedQuery = em.createQuery(query.toString(), Subject.class);
        return typedQuery;
    }
}
