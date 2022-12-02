package swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class ClassEvalCriteria {
    private final EntityManager em;

    public TypedQuery<ClassUser> displayTrainee(String keyword, String filterAssignment,
            User user, String classCode) {

        StringBuilder query = new StringBuilder(
                "SELECT u FROM ClassUser u WHERE u.classes.code = '"
                        + classCode + "'");

        if (keyword != null) {
            query.append(" AND (u.user.accountName LIKE '%" + keyword + "%')");
        }

        if (filterAssignment != null) {
            query.append(" AND m.milestone.milestoneId = '" + filterAssignment + "'");
        }

        query.append(" ORDER BY u.user.fullName ASC");
        TypedQuery<ClassUser> typedQuery = em.createQuery(query.toString(), ClassUser.class);
        System.out.println(query.toString());
        return typedQuery;
    }
}
