package swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;

@Repository
@RequiredArgsConstructor
public class UserTraineeCriteria {
    
    private final EntityManager em;

    public TypedQuery<ClassUser> displayTrainee(String keyword, String filterClass, String filterStatus) {
        StringBuilder query = new StringBuilder("SELECT DISTINCT u FROM ClassUser u WHERE 1=1");

        if (keyword != null) {
            query.append(" AND u.user.fullName LIKE '%" + keyword + "%'" + "OR u.user.accountName LIKE '%" + keyword
                    + "%' OR u.user.email LIKE  '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND u.status = '" + filterStatus + "'");
        }
        if (filterClass != null) {
            query.append(" AND u.classes.code = '" + filterClass + "'");
        }

        query.append(" ORDER BY u.classes ASC");
        TypedQuery<ClassUser> typedQuery = em.createQuery(query.toString(), ClassUser.class);
        System.out.println(query.toString());
        return typedQuery;
    }
}