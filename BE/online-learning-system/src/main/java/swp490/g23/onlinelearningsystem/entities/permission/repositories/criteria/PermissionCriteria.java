package swp490.g23.onlinelearningsystem.entities.permission.repositories.criteria;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@Repository
@RequiredArgsConstructor
public class PermissionCriteria {
    private final EntityManager em;

    public TypedQuery<SettingPermission> getScreenByRoles(List<Setting> roles) {
        StringBuilder query = new StringBuilder("SELECT p FROM SettingPermission p");

        for (Setting setting : roles) {
            if (query.toString().equals("SELECT p FROM SettingPermission p")) {
                query.append(" WHERE p.role.settingValue = '" + setting + "' ");
            } else {
                query.append(" OR p.role.settingValue = '" + setting + "' ");
            }

        }
        TypedQuery<SettingPermission> typedQuery = em.createQuery(query.toString(), SettingPermission.class);

        return typedQuery;
    }
}
