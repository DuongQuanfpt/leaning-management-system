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

@Repository
@RequiredArgsConstructor
public class ScheduleCriteria {
    private final EntityManager em;

    public ScheduleQuery searchFilterSchedule(String keyword, String filterStatus, String filterDate,
            String filterYear, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder(
                "SELECT s FROM Schedule s JOIN s.classes as c JOIN c.userSupporter as su WHERE 1=1 ");

        if (roles.contains("ROLE_SUPPORTER")) {
            query.append(" AND su.accountName = '" + user.getAccountName() + "'");
        }
        if (keyword != null) {
            query.append(
                    " AND (a.title LIKE '%" + keyword + "%' OR a.forSubject.subjectCode LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            query.append(" AND s.status = '" + filterStatus + "'");
        }

        if (filterDate != null) {
            query.append(" AND s.trainingDate = '" + filterDate + "'");
        }

        if (filterYear != null) {
            query.append(" AND s.trainingDate LIKE '%" + filterYear + "%'");
        }
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT s", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Schedule> typedQuery = em.createQuery(query.toString(), Schedule.class);

        ScheduleQuery result = new ScheduleQuery(typedQuery, countQuery);
        return result;
    }
}
