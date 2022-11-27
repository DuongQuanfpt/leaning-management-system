package swp490.g23.onlinelearningsystem.entities.class_user.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class ClassEvalCriteria {
    private final EntityManager em;

    public TypedQuery<ClassUser> displayTrainee(String keyword, String filterAssignment,
            User user, String classCode) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT u FROM ClassUser u WHERE u.classes.code = '"
                        + classCode + "'");

        if (roles.contains("ROLE_TRAINER") && roles.contains("ROLE_ TRAINEE")) {
            query.append(
                    " AND u.classes.userTrainer.accountName = '" + user.getAccountName() + "' OR u.user.accountName = '"
                            + user.getAccountName() + "'");
        } else {
            if (roles.contains("ROLE_TRAINER")) {
                query.append(" AND u.classes.userTrainer.accountName = '" + user.getAccountName() + "'");
            }
            if (roles.contains("ROLE_TRAINEE")) {
                query.append(" AND u.user.accountName = '" + user.getAccountName() + "'");
            }
        }

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
