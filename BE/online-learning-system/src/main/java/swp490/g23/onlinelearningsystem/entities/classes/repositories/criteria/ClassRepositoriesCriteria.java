package swp490.g23.onlinelearningsystem.entities.classes.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class ClassRepositoriesCriteria {

    private final EntityManager em;

    public TypedQuery<Classes> displayClass(String keyword, String filterTerm, String filterTrainer,
            String filterSupporter, String filterBranch, String filterStatus, User currentUser) {

        List<Setting> settings = currentUser.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }

        StringBuilder query = new StringBuilder("SELECT DISTINCT c FROM Classes c  WHERE 1=1");

        if (roles.contains("ROLE_MANAGER")) {

        } else if (roles.contains("ROLE_TRAINER") && roles.contains("ROLE_SUPPORTER")) {
            query.append(" AND c.userTrainer.accountName = '" + currentUser.getAccountName() + "' OR c.userSupporter.accountName = '"
                    + currentUser.getAccountName() + "'");
        } else {
            if (roles.contains("ROLE_TRAINER")) {
                query.append(" AND c.userTrainer.accountName = '" + currentUser.getAccountName() + "'");
            }
            if (roles.contains("ROLE_SUPPORTER")) {
                query.append(" AND c.userSupporter.accountName = '" + currentUser.getAccountName() + "'");
            }
        }

        if (keyword != null) {
            query.append(" AND (c.code LIKE '%" + keyword + "%' OR c.subject.subjectCode LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            query.append(" AND c.status = '" + filterStatus + "'");
        }

        if (filterTerm != null) {
            query.append("AND c.settingTerm.settingValue = '" + filterTerm + "'");
        }

        if (filterTrainer != null) {
            query.append("AND c.userTrainer.accountName = '" + filterTrainer + "'");
        }

        if (filterSupporter != null) {
            query.append("AND c.userSupporter.accountName = '" + filterSupporter + "'");
        }
        if (filterBranch != null) {
            query.append("AND c.settingBranch.settingValue = '" + filterBranch + "'");
        }

        query.append(" ORDER BY c.classId ASC");
        System.out.println(query.toString());
        TypedQuery<Classes> typedQuery = em.createQuery(query.toString(), Classes.class);

        return typedQuery;
    }
}
