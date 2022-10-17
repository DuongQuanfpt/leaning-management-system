package swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.criteriaEntity.SubjectSettingQuery;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class SubjectSettingCriteria {
    private final EntityManager em;

    public SubjectSettingQuery searchFilterSubjectSetting(String keyword, String filterStatus, String filterType,
            String filterSubject, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }
        StringBuilder query = new StringBuilder("SELECT s FROM SubjectSetting s WHERE 1=1 ");

        // if(roles.contains("ROLE_ADMIN")){

        // } else if (roles.contains("ROLE_MANAGER")){
        //     query.append(" AND s.manager.accountName = '" + user.getAccountName() + "' ");
        // } 

        if (keyword != null) {
            query.append(" AND s.settingTitle LIKE '%" + keyword + "%' OR s.settingValue LIKE '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND s.status = '" + filterStatus + "'");
        }

        if (filterSubject != null) {
            query.append(" AND s.subject.subjectCode = '" + filterSubject + "'");
        }

        if (filterType != null) {
            query.append(" AND s.type.settingValue = '" + filterType + "'");
        }
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT s", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<SubjectSetting> typedQuery = em.createQuery(query.toString(), SubjectSetting.class);
        System.out.println(query.toString());
        SubjectSettingQuery result = new SubjectSettingQuery(typedQuery, countQuery);
        return result;
    }
}
