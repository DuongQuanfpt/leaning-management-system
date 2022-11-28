package swp490.g23.onlinelearningsystem.entities.class_setting.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.criteriaEntity.ClassSettingQuery;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class ClassSettingCriteria {
    private final EntityManager em;

    public ClassSettingQuery searchFilterClassSetting(String keyword, String filterStatus, String filterType,
            String filterClass, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT cs FROM ClassSetting cs WHERE cs.classes.status = swp490.g23.onlinelearningsystem.enums.ClassStatus.Active ");

        if (roles.contains("ROLE_TRAINER")) {

        } else if (roles.contains("ROLE_SUPPORTER")) {
            query.append(" AND  cs.classes.userSupporter.accountName = '" + user.getAccountName() + "' ");
        }

        if (keyword != null) {
            query.append(" AND (cs.settingTitle LIKE '%" + keyword + "%' OR cs.settingValue LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            query.append(" AND cs.status = '" + filterStatus + "'");
        }

        if (filterClass != null) {
            query.append(" AND cs.classes.code = '" + filterClass + "'");
        }

        if (filterType != null) {
            query.append(" AND cs.type.settingValue = '" + filterType + "'");
        }

        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT cs", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<ClassSetting> typedQuery = em.createQuery(query.toString(), ClassSetting.class);
        System.out.println(query.toString());
        ClassSettingQuery result = new ClassSettingQuery(typedQuery, countQuery);
        return result;
    }

}
