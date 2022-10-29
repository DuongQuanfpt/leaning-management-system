package swp490.g23.onlinelearningsystem.entities.group.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.criteria_entity.GroupQuery;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class GroupCriteria {
    private final EntityManager em;

    public GroupQuery searchFilterGroup(String keyword,String filterMilestone, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT DISTINCT g FROM Group g JOIN g.submits as s  WHERE 1=1  ");

        // if (roles.contains("ROLE_TRAINER")) {

        // } else if (roles.contains("ROLE_SUPPORTER")) {
        // query.append(" AND cs.classes.userSupporter.accountName = '" +
        // user.getAccountName() + "' ");
        // }

        // if (keyword != null) {
        // query.append(" AND (cs.settingTitle LIKE '%" + keyword + "%' OR
        // cs.settingValue LIKE '%" + keyword + "%')");
        // }

        // if (filterStatus != null) {
        // query.append(" AND cs.status = '" + filterStatus + "'");
        // }
        
        if (filterMilestone != null) {
            query.append(" AND s.milestone.milestoneId = '" + filterMilestone + "'");
        }

        // if (filterActive != null) {
        //     query.append(" AND g.status = '" + filterActive + "'");
        // }

        StringBuilder queryCount = new StringBuilder(
                query.toString().replaceAll("SELECT DISTINCT g", "SELECT COUNT(DISTINCT g)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Group> typedQuery = em.createQuery(query.toString(), Group.class);
        System.out.println(query.toString());
        GroupQuery result = new GroupQuery(typedQuery, countQuery);
        return result;
    }

}
