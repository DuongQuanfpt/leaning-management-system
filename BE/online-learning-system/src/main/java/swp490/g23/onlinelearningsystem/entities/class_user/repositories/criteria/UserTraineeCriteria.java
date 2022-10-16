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
public class UserTraineeCriteria {

    private final EntityManager em;

    public TypedQuery<ClassUser> displayTrainee(String keyword, String filterClass, String filterStatus,
            User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT DISTINCT u FROM ClassUser u JOIN u.classes as c JOIN c.userTrainer as t JOIN c.userSupporter as s WHERE 1=1");

        if (roles.contains("ROLE_MANAGER")) {

        } else if (roles.contains("ROLE_TRAINER") && roles.contains("ROLE_SUPPORTER")) {
            query.append(" AND t.accountName = '" + user.getAccountName() + "' OR s.accountName = '"
                    + user.getAccountName() + "'");
        } else {
            if (roles.contains("ROLE_TRAINER")) {
                query.append(" AND t.accountName = '" + user.getAccountName() + "'");
            }
            if (roles.contains("ROLE_SUPPORTER")) {
                query.append(" AND s.accountName = '" + user.getAccountName() + "'");
            }
        }

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