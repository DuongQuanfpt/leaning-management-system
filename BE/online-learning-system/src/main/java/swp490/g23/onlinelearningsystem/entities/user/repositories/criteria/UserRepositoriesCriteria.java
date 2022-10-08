package swp490.g23.onlinelearningsystem.entities.user.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class UserRepositoriesCriteria {

    @Autowired
    SettingRepositories settingRepositories;

    private final EntityManager em;

    public TypedQuery<User> displayUser(String keyword, String filterRole, String filterStatus) {
        StringBuilder query = new StringBuilder("SELECT u FROM User u WHERE 1=1");

        
        if (keyword != null) {
            query.append(" AND u.fullName LIKE '%" + keyword + "%'" + "OR u.mobile LIKE '%" + keyword + "%' OR u.email LIKE  '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND u.status = '" + filterStatus + "'");
        }

        // if( filterRole != null){
        //     // Setting setting = (settingRepositories.findBySettingTitle(filterRole));
        //     query.append("AND s.settingTitle = '" + filterRole + "'");
        // }

        query.append(" ORDER BY u.userId ASC");
        TypedQuery<User> typedQuery = em.createQuery(query.toString(), User.class);

        return typedQuery;
    }
}
