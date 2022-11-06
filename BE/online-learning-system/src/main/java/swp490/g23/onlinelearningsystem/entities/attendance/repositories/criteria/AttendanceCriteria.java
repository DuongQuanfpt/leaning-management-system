package swp490.g23.onlinelearningsystem.entities.attendance.repositories.criteria;

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
public class AttendanceCriteria {
    private final EntityManager em;

    public TypedQuery<ClassUser> getListAttendance(String filterClass, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT DISTINCT u FROM ClassUser u JOIN u.attendances as a JOIN u.classes as c JOIN c.userTrainer as t JOIN c.userSupporter as s WHERE 1=1");

        if (roles.contains("ROLE_TRAINER") && roles.contains("ROLE_SUPPORTER")) {
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
        if (filterClass != null) {
            query.append(" AND u.classes.code = '" + filterClass + "'");
        }
        TypedQuery<ClassUser> typedQuery = em.createQuery(query.toString(), ClassUser.class);
        System.out.println(query.toString());
        return typedQuery;
    }
}
