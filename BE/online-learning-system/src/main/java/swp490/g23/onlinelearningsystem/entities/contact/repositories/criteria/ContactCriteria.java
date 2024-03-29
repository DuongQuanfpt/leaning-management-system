package swp490.g23.onlinelearningsystem.entities.contact.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.contact.domain.WebContact;
import swp490.g23.onlinelearningsystem.entities.contact.repositories.criteriaEntity.ContactQuery;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class ContactCriteria {
    private final EntityManager em;

    public ContactQuery displaySetting(String keyword, String filterCategory, String filterStatus,String filterSupp,User user) {
        StringBuilder query = new StringBuilder("SELECT c FROM WebContact c LEFT JOIN c.staff as s WHERE 1=1");


        query.append(" AND (s IS NULL OR s.accountName ='"+ user.getAccountName() +"')");

        if (keyword != null) {
            query.append(" AND (c.fullName LIKE '%" + keyword + "%' OR c.email LIKE '%" + keyword
                    + "%' OR c.message LIKE '%" + keyword + "%' OR c.response LIKE '%" + keyword + "%')");
        }

        if (filterStatus != null) {
            query.append(" AND c.status = '" + filterStatus + "'");
        }

        if (filterCategory != null) {
            query.append(" AND c.category.settingValue = '" + filterCategory + "'");
        }

        if (filterSupp != null) {
            query = new StringBuilder(query.toString().replaceAll("SELECT c FROM WebContact c", 
            "SELECT c FROM WebContact c JOIN c.staff as s"));
            query.append(" AND s.accountName = '" + filterSupp + "'");
        }

        query.append(" ORDER BY c.contactId ASC");
        StringBuilder queryCount = new StringBuilder(query.toString().replaceAll("SELECT c", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<WebContact> typedQuery = em.createQuery(query.toString(), WebContact.class);
        System.out.println(query.toString());
        return new ContactQuery(typedQuery,countQuery);
    }
}
