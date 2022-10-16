package swp490.g23.onlinelearningsystem.entities.subject.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.criteriaEntity.SubjectQuery;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class SubjectRepositoriesCriteria {
    private final EntityManager em;

    public SubjectQuery searchFilterSubject(String keyword, String filterStatus, String filterManager,
            String filterExpert, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder("SELECT s FROM Subject s WHERE 1=1 ");

        if(roles.contains("ROLE_ADMIN")){

        } else if (roles.contains("ROLE_MANAGER")){
            query.append(" AND s.manager.accountName = '" + user.getAccountName() + "' ");
        } 

        if (keyword != null) {
            query.append(" AND s.subjectName LIKE '%" + keyword + "%' OR s.subjectCode LIKE '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND s.subjectStatus = '" + filterStatus + "'");
        }

        if (filterManager != null) {
            query.append(" AND s.manager.accountName = '" + filterManager + "'");
        }

        if (filterExpert != null) {
            query.append(" AND s.expert.accountName = '" + filterExpert + "'");
        }
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT s", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Subject> typedQuery = em.createQuery(query.toString(), Subject.class);
        System.out.println(query.toString());
        SubjectQuery result = new SubjectQuery(typedQuery, countQuery);
        return result;
    }
}
