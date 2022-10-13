package swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class UserTraineeCriteria {
    
    private final EntityManager em;

    public TypedQuery<User> displayTrainee(String keyword, String filterClass, String filterStatus) {
        StringBuilder query = new StringBuilder("SELECT DISTINCT u FROM User u JOIN u.settings as s WHERE s.settingValue = 'ROLE_TRAINEE' ");

        if (keyword != null) {
            query.append(" AND u.fullName LIKE '%" + keyword + "%'" + "OR u.accountName LIKE '%" + keyword
                    + "%' OR u.email LIKE  '%" + keyword + "%'");
        }

        if (filterStatus !=null || filterClass != null) {
            query = new StringBuilder(query.toString().replaceAll("SELECT DISTINCT u FROM User u JOIN u.settings as s WHERE s.settingValue = 'ROLE_TRAINEE'",
                    "SELECT DISTINCT u FROM User u JOIN u.classUsers as c WHERE 1=1"));
            if (filterStatus != null) {
                query.append(" AND c.status = '" + filterStatus + "'");
            }
            if (filterClass != null) {
                query.append(" AND c.classes.code = '" + filterClass + "'");
            }
        }
        
        query.append(" ORDER BY u.userId ASC");
        TypedQuery<User> typedQuery = em.createQuery(query.toString(), User.class);
        System.out.println(query.toString());
        return typedQuery;
    }
}