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
        StringBuilder query = new StringBuilder("SELECT DISTINCT c FROM Classes c WHERE 1=1");

        
        if (keyword != null) {
            query.append(" AND c.code LIKE '%" + keyword + "%' OR s.subject.subjectName LIKE '%" + keyword + "%'");
        }

        if (filterStatus != null) {
            query.append(" AND c.status = '" + filterStatus + "'");
        }

        if( filterTerm != null){
            query.append("AND c.settingTerm.settingTitle = '" + filterTerm + "'");
        }

        if( filterTrainer != null){
            query.append("AND c.userTrainer.accountName = '" + filterTrainer + "'");
        }

        if( filterSupporter != null){
            query.append("AND c.userSupporter.accountName = '" + filterSupporter + "'");
        }
        if( filterBranch != null){
            query.append("AND c.settingBranch.settingTitle = '" + filterBranch + "'");
        }

        query.append(" ORDER BY c.classId ASC");
        TypedQuery<Classes> typedQuery = em.createQuery(query.toString(), Classes.class);

        return typedQuery;
    }
}
