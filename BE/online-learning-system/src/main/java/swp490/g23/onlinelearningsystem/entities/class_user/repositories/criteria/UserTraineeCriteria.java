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
        StringBuilder query = new StringBuilder("SELECT DISTINCT c FROM ClassUser c WHERE 1=1");

        if (keyword != null) {
            query.append(" AND c.user.fullName LIKE '%" + keyword + "%'" + "OR c.user.accountName LIKE '%" + keyword
                    + "%' OR c.user.email LIKE  '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            
            query.append(" AND c.status = '" + filterStatus + "'");
        }

        if (filterClass != null) {
            query.append(" AND c.classes.code = '" + filterClass + "'");
        }

        TypedQuery<ClassUser> typedQuery = em.createQuery(query.toString(), ClassUser.class);
        System.out.println(query.toString());
        return typedQuery;
    }
}