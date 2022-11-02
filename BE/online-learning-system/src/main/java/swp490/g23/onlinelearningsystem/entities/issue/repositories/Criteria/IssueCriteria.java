package swp490.g23.onlinelearningsystem.entities.issue.repositories.Criteria;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.CriteriaEntity.IssueQuery;

@Repository
@RequiredArgsConstructor
public class IssueCriteria {
    private final EntityManager em;

    public IssueQuery searchFilterQuery(String keyword, String filterStatus,
            Long filterMilestoneId, Long filterGroupId , String filterAsigneeName,
            String filterTypeValue) {

        StringBuilder query = new StringBuilder("SELECT i FROM Issue i WHERE 1=1 ");

        // if (roles.contains("ROLE_TRAINER")) {

        // } else if (roles.contains("ROLE_SUPPORTER")) {
        // query.append(" AND cs.classes.userSupporter.accountName = '" +
        // user.getAccountName() + "' ");
        // }

        // if (keyword != null) {
        // query.append(" AND (cs.settingTitle LIKE '%" + keyword + "%' OR
        // cs.settingValue LIKE '%" + keyword + "%')");
        // }

        // if (filterStatus != null) {
        // query.append(" AND cs.status = '" + filterStatus + "'");
        // }

        // if (filterMilestone != null) {
        //     query.append(" AND s.milestone.milestoneId = '" + filterMilestone + "'");
        // }

        // if (filterActive != null) {
        // query.append(" AND g.status = '" + filterActive + "'");
        // }

        StringBuilder queryCount = new StringBuilder(
                query.toString().replaceAll("SELECT i", "SELECT COUNT(DISTINCT g)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Issue> typedQuery = em.createQuery(query.toString(), Issue.class);
        System.out.println(query.toString());
        IssueQuery result = new IssueQuery(typedQuery, countQuery);
        return result;
    }
}
