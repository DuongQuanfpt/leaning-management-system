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

    public IssueQuery searchFilterQuery(String keyword, Long filterStatusId,
            Long filterMilestoneId, Long filterGroupId, String filterAsigneeName,
            Long filterTypeId,Long filterRequirementId , String classCode) {

        StringBuilder query = new StringBuilder("SELECT i FROM Issue i WHERE i.classes.code = '" + classCode + "'");

        // if (roles.contains("ROLE_TRAINER")) {

        // } else if (roles.contains("ROLE_SUPPORTER")) {
        // query.append(" AND cs.classes.userSupporter.accountName = '" +
        // user.getAccountName() + "' ");
        // }

        if (keyword != null) {
            query.append(" AND i.title LIKE '%" + keyword + "%'");
        }

        if (filterMilestoneId != null) {
            query.append(" AND i.milestone.milestoneId = '" + filterMilestoneId + "'");
        } 

        if (filterGroupId != null) {
            query.append(" AND i.group.groupId = '" + filterGroupId + "'");
        }

        if (filterAsigneeName != null) {
            query.append(" AND i.asignee.accountName = '" + filterAsigneeName + "'");
        }

        if (filterTypeId != null) {
            query.append(" AND i.type.classSettingId = '" + filterTypeId + "'");
        }

        if (filterRequirementId != null) {
            query.append(" AND i.requirement.issueId = '" + filterRequirementId + "'");
        }

        if (filterStatusId != null) {
            if (filterStatusId.equals("Open")) {
                query.append(" AND i.isClosed = 0");
            } else if (filterStatusId.equals("Closed")) {
                query.append(" AND i.isClosed = 1");
            } else {
                query.append(" AND i.status.classSettingId = '" + filterStatusId + "'");
            }
        }

        StringBuilder queryCount = new StringBuilder(
                query.toString().replaceAll("SELECT i", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Issue> typedQuery = em.createQuery(query.toString(), Issue.class);
        System.out.println(query.toString());
        IssueQuery result = new IssueQuery(typedQuery, countQuery);
        return result;
    }
}
