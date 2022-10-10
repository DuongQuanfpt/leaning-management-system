package swp490.g23.onlinelearningsystem.entities.setting.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@Repository
@RequiredArgsConstructor
public class SettingRepositoriesCriteria {
    private final EntityManager em;

    public TypedQuery<Setting> displaySetting(String keyword, String filterType, String filterStatus) {
        StringBuilder query = new StringBuilder("SELECT s FROM Setting s WHERE s.type IS NOT NULL " +
        "AND s.type.settingValue != 'TYPE_ROLE' AND s.type.settingValue != 'TYPE_API' "+
        "AND s.type.settingValue != 'TYPE_SCREEN'");

        if (keyword != null) {
            query.append(" AND s.settingTitle LIKE '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND s.status = '" + filterStatus + "'");
        }

        if( filterType != null){
            query.append(" AND s.type.settingValue = '" + filterType + "'");
        }

        query.append(" ORDER BY s.displayOrder ASC");
        TypedQuery<Setting> typedQuery = em.createQuery(query.toString(), Setting.class);

        return typedQuery;
    }
}
