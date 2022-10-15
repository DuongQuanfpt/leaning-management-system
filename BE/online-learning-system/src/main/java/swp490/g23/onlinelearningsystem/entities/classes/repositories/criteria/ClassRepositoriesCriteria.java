package swp490.g23.onlinelearningsystem.entities.classes.repositories.criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

@Repository
@RequiredArgsConstructor
public class ClassRepositoriesCriteria {

    private final EntityManager em;

    public TypedQuery<Classes> displayClass(String keyword, String filterTerm, String filterTrainer,
                                         String filterSupporter, String filterBranch, String filterStatus) {
        StringBuilder query = new StringBuilder("SELECT DISTINCT c FROM Classes c LEFT OUTER JOIN c.classSubject as cs WHERE 1=1");

        if (keyword != null) {
            // query = new StringBuilder(query.toString().replaceAll("SELECT c FROM Classes c", 
            //         "SELECT DISTINCT c FROM Classes c  LEFT OUTER JOIN c.classSubject as cs"));
            query.append(" AND c.code LIKE '%" + keyword + "%' OR c.classSubject.subject.subjectName LIKE '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND c.status = '" + filterStatus + "'");
        }

        if( filterTerm != null){
            query.append("AND c.settingTerm.settingValue = '" + filterTerm + "'");
        }

        if( filterTrainer != null){
            query.append("AND c.userTrainer.accountName = '" + filterTrainer + "'");
        }

        if( filterSupporter != null){
            query.append("AND c.userSupporter.accountName = '" + filterSupporter + "'");
        }
        if( filterBranch != null){
            query.append("AND c.settingBranch.settingValue = '" + filterBranch + "'");
        }

        query.append(" ORDER BY c.classId ASC");
        System.out.println(query.toString());
        TypedQuery<Classes> typedQuery = em.createQuery(query.toString(), Classes.class);

        return typedQuery;
    }
}
