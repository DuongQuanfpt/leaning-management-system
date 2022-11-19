package swp490.g23.onlinelearningsystem.entities.schedule.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.schedule.repositories.criteria_entity.ScheduleQuery;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;

@Repository
@RequiredArgsConstructor
public class ScheduleCriteria {
    private final EntityManager em;

    public ScheduleQuery searchFilterSchedule(String keyword, Long statusValue, String filterDateFrom,
            String filterDateTo, String filterClass, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT s FROM Schedule s JOIN s.classes as c JOIN c.userSupporter as su JOIN c.userTrainer as t WHERE 1=1 ");

        if (roles.contains("ROLE_TRAINER") && roles.contains("ROLE_SUPPORTER")) {
            query.append(" AND t.accountName = '" + user.getAccountName() + "' OR su.accountName = '"
                    + user.getAccountName() + "'");
        } else {
            if (roles.contains("ROLE_TRAINER")) {
                query.append(" AND t.accountName = '" + user.getAccountName() + "'");
            }
            if (roles.contains("ROLE_SUPPORTER")) {
                query.append(" AND su.accountName = '" + user.getAccountName() + "'");
            }
        }
        if (keyword != null) {
            query.append(
                    " AND (s.classSetting.settingTitle LIKE '%" + keyword + "%')");
        }

        if (statusValue != null) {
            ScheduleStatus status = ScheduleStatus.fromInt(statusValue.intValue());
            if (status == ScheduleStatus.Active) {
                query.append(
                        " AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus.Active ");
            }

            if (status == ScheduleStatus.Inactive) {
                query.append(
                        " AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus.Inactive ");
            }

            if (status == ScheduleStatus.Attendance_taken) {
                query.append(" AND s.status IS NULL");
            }
        }

        if (filterDateFrom != null && filterDateTo != null) {
            query.append(" AND s.trainingDate BETWEEN '" + filterDateFrom + "' AND '" + filterDateTo + "'");
        }

        if (filterClass != null) {
            query.append(" AND s.classes.code = '" + filterClass + "'");
        }
        query.append(" ORDER BY s.trainingDate ASC, s.fromTime ASC, s.toTime ASC");
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT s", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Schedule> typedQuery = em.createQuery(query.toString(), Schedule.class);

        ScheduleQuery result = new ScheduleQuery(typedQuery, countQuery);
        return result;
    }
}
