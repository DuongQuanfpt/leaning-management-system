package swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity.SubmitQuery;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;

@Repository
@RequiredArgsConstructor
public class SubmitCriteria {
    private final EntityManager em;

    public SubmitQuery searchFilterSubmit(String keyword, Long statusValue, Long milestoneId,
            Long groupId, Long assignmentId, User user, String classCode, boolean isGroup) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT s FROM Submit s LEFT JOIN s.group.groupMembers as m WHERE s.classUser.classes.code = '"
                        + classCode + "' "
                        + " AND (m.member = s.classUser.user OR s.group IS NULL ) "
                        + " AND (s.milestone.status = swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum.In_Progress OR s.milestone.status IS NULL )");

        // StringBuilder query = new StringBuilder(
        // "SELECT s FROM Submit s WHERE s.classUser.classes.code = '" + classCode
        // + "' AND (s.milestone.status =
        // swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum.In_Progress
        // OR s.milestone.status IS NULL )");

        // if (roles.contains("ROLE_ADMIN")) {

        // } else if (roles.contains("ROLE_MANAGER")) {
        // query.append(" AND s.manager.accountName = '" + user.getAccountName() + "'
        // ");
        // }

        if (isGroup == true) {
            query.append(" AND s.milestone.assignment.isTeamWork = true and m.isLeader = 1 ");
        } else {
            query.append(" AND s.milestone.assignment.isTeamWork = false");
        }

        if (keyword != null) {
            query.append(" AND s.classUser.user.accountName LIKE '%" + keyword + "%' ");
        }

        if (milestoneId != null && milestoneId != 0) {
            query.append(" AND s.milestone.milestoneId = '" + milestoneId + "'");
        }

        if (groupId != null) {
            query.append(" AND s.group.groupId = '" + groupId + "'");
        }

        if (statusValue != null) {
            SubmitStatusEnum status = SubmitStatusEnum.fromInt(statusValue.intValue());
            if (status == SubmitStatusEnum.Evaluated) {
                query.append(" AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum.Evaluated ");
            }

            if (status == SubmitStatusEnum.Submitted) {
                query.append(" AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum.Submitted ");
            }

            if (status == SubmitStatusEnum.Pending) {
                query.append(" AND s.status IS NULL");
            }
            
        }

        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT s", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Submit> typedQuery = em.createQuery(query.toString(), Submit.class);
        System.out.println(query.toString());
        SubmitQuery result = new SubmitQuery(typedQuery, countQuery);
        return result;
    }
}
