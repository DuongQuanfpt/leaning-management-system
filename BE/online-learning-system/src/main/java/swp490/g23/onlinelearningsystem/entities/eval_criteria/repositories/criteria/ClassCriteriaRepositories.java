package swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.domain.EvalCriteria;
import swp490.g23.onlinelearningsystem.entities.eval_criteria.repositories.criteriaEntity.CriteriaQuery;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class ClassCriteriaRepositories {
    private final EntityManager em;

    public CriteriaQuery searchFilterClassCriteria(String keyword, String filterStatus, String filterMilestone,
            String filterClass, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }

        StringBuilder query = new StringBuilder(
                "SELECT e FROM EvalCriteria e JOIN e.milestone as m JOIN m.classes as c JOIN c.userTrainer as t JOIN c.userSupporter as s WHERE e.milestone.classes.status = '1' ");

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

        if (keyword != null) {
            query.append(" AND (e.criteriaName LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            query.append(" AND e.status = '" + filterStatus + "'");
        }

        if (filterMilestone != null) {
            query.append(" AND e.miletone.title = '" + filterMilestone + "' AND e.milestone IS NOT NULL");
        }

        if (filterClass != null) {
            query.append(" AND e.milestone.classes.code = '" + filterClass + "' AND e.milestone IS NOT NULL");
        }
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT e", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<EvalCriteria> typedQuery = em.createQuery(query.toString(), EvalCriteria.class);

        CriteriaQuery result = new CriteriaQuery(typedQuery, countQuery);
        return result;
    }
}
