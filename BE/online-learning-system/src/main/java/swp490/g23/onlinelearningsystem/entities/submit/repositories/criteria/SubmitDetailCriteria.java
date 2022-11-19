package swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;

@Repository
@RequiredArgsConstructor
public class SubmitDetailCriteria {
    private final EntityManager em;

    public TypedQuery<SubmitWork> getSubmitWorks(String keyword, String filterTeam,
            String filterAssignee, Long statusValue, User currentUser, String classCode) {

        // List<Setting> settings = currentUser.getSettings();
        // List<String> roles = new ArrayList<>();
        // for (Setting setting : settings) {
        // roles.add(setting.getSettingValue());
        // }

        StringBuilder query = new StringBuilder(
                "SELECT s FROM SubmitWork s JOIN s.submit as su JOIN su.classUser as cu JOIN cu.classes as c JOIN c.userTrainer as t WHERE c.code = '"
                        + classCode + "'");

        // if (roles.contains("ROLE_TRAINER") && roles.contains("ROLE_TRAINEE")) {
        // query.append(" AND t.accountName = '" + currentUser.getAccountName()
        // + "' OR cu.user.accountName = '"
        // + currentUser.getAccountName() + "'");
        // } else {
        // if (roles.contains("ROLE_TRAINER")) {
        // query.append(" AND t.accountName = '" + currentUser.getAccountName() + "'");
        // }
        // if (roles.contains("ROLE_TRAINEE")) {
        // query.append(" AND cu.user.accountName = '" + currentUser.getAccountName() +
        // "'");
        // }
        // }

        if (keyword != null) {
            query.append(" AND (s.work.title LIKE '%" + keyword + "%')");
        }

        if (statusValue != null) {
            SubmitWorkStatusEnum status = SubmitWorkStatusEnum.fromInt(statusValue.intValue());
            if (status == SubmitWorkStatusEnum.Evaluated) {
                query.append(
                        " AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum.Evaluated ");
            }

            if (status == SubmitWorkStatusEnum.Rejected) {
                query.append(
                        " AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum.Rejected ");
            }

            if (status == SubmitWorkStatusEnum.Submitted) {
                query.append(" AND s.status IS NULL");
            }
        }

        // if (filterMilestone != null) {
        // query.append(" AND s.milestone.title = '" + filterMilestone + "'");

        // }
        if (filterTeam != null) {
            query.append(" AND s.submit.group.groupCode = '" + filterTeam + "'");

        }
        if (filterAssignee != null) {
            query.append(" AND s.submit.classUser.user.accountName = '" + filterAssignee + "'");

        }

        query.append(" ORDER BY su.submitId ASC");
        TypedQuery<SubmitWork> typedQuery = em.createQuery(query.toString(), SubmitWork.class);
        System.out.println(query.toString());
        return typedQuery;
    }
}
