package swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria_entity.MilestoneQuery;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;

@Repository
@RequiredArgsConstructor
public class MilestoneCriteria {
    private final EntityManager em;

    public MilestoneQuery searchFilterMilestone(String keyword, String filterStatus, String filterAss,
            String filterClass, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT m FROM Milestone m WHERE 1=1");

        if (roles.contains("ROLE_TRAINER") || roles.contains("ROLE_SUPPORTER")) {
            query.append(" AND (m.classes.userSupporter.accountName = '" + user.getAccountName()
                    + "' OR m.classes.userTrainer.accountName = '" + user.getAccountName() + "')");
        }

        if (keyword != null) {
            query.append(" AND (m.title LIKE '%" + keyword + "%' OR m.description LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            MilestoneStatusEnum statusEnum = MilestoneStatusEnum.fromInt(Integer.parseInt(filterStatus));
            if (statusEnum.getValue() == null) {
                query.append(" AND m.status IS NULL");
            } else {
                String statusValue;
                if (statusEnum.getValue() == true) {
                    statusValue = "swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum.In_Progress";
                } else {
                    statusValue = "swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum.Open";
                }
                query.append(" AND m.status = " + statusValue + " ");
            }

        }

        if (filterAss != null) {
            query.append(" AND m.assignment.assId = '" + filterAss + "'");
        }

        if (filterClass != null) {
            query.append(" AND m.classes.code = '" + filterClass + "'");
        }

        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT m", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Milestone> typedQuery = em.createQuery(query.toString(), Milestone.class);
        System.out.println(query.toString());
        MilestoneQuery result = new MilestoneQuery(typedQuery, countQuery);
        return result;
    }
}
