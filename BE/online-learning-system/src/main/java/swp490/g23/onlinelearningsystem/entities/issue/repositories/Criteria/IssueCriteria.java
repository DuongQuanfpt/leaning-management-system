package swp490.g23.onlinelearningsystem.entities.issue.repositories.Criteria;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueFilterRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.CriteriaEntity.IssueQuery;

@Repository
@RequiredArgsConstructor
public class IssueCriteria {
    private final EntityManager em;

    public IssueQuery searchFilterQuery(String keyword, String classCode, boolean isIssue, Long filterMilestoneId,
            IssueFilterRequestDTO filterRequestDTO) {

        StringBuilder query = new StringBuilder(
                "SELECT i FROM Issue i LEFT JOIN i.asignee as a WHERE i.classes.code = '" + classCode + "'");

        if (isIssue == false) {
            query.append(" AND i.type IS NULL");
        } else {
            query.append(" AND i.type IS NOT NULL");
        }

        if (filterMilestoneId != null) {
            query.append(" AND i.milestone.milestoneId = '" + filterMilestoneId + "'");
        }

        if (keyword != null) {
            query.append(" AND (i.title LIKE '%" + keyword + "%' OR i.issueId LIKE '%" + keyword + "%')");
        }
    
        if (filterRequestDTO != null) {
            List<Long> groupFilter = filterRequestDTO.getGroupIds();
            if (groupFilter != null && !groupFilter.isEmpty()) {
                query.append(" AND (");

                for (Long groupId : groupFilter) {
                    if (groupId == 0) {
                        query.append(" i.group IS NULL");
                    } else {
                        query.append(" i.group.groupId = '" + groupId + "'");
                    }

                    if (groupId != groupFilter.get(groupFilter.size() - 1)) {
                        query.append(" OR");
                    }
                }

                query.append(" )");
            }

            List<Long> statusFilter = filterRequestDTO.getStatusIds();
            if (statusFilter != null && !statusFilter.isEmpty()) {
                query.append(" AND (");

                for (Long statusId : statusFilter) {
                    if (statusId == 1) {
                        query.append(" i.isClosed = 0 AND i.status IS NULL");
                    } else if (statusId == 0) {
                        query.append(" i.isClosed = 1");
                    } else {
                        query.append(" i.status.classSettingId = '" + statusId + "'");
                    }

                    if (statusId != statusFilter.get(statusFilter.size() - 1)) {
                        query.append(" OR");
                    }
                }

                query.append(" )");
            }

            List<Long> typeFilter = filterRequestDTO.getTypeIds();
            if (typeFilter != null && !typeFilter.isEmpty()) {
                query.append(" AND (");

                for (Long typeId : typeFilter) {

                    query.append(" i.type.classSettingId = '" + typeId + "'");

                    if (typeId != typeFilter.get(typeFilter.size() - 1)) {
                        query.append(" OR");
                    }
                }

                query.append(" )");
            }

            List<String> assigneeFilter = filterRequestDTO.getAssigneeNames();
            if (assigneeFilter != null && !assigneeFilter.isEmpty()) {
                query.append(" AND (");

                for (String username : assigneeFilter) {
                    if (username.equalsIgnoreCase("none")) {
                        query.append(" i.asignee IS NULL");
                    } else {
                        query.append(" i.asignee.accountName = '" + username + "'");
                    }

                    if (!username.equals(assigneeFilter.get(assigneeFilter.size() - 1))) {
                        query.append(" OR");
                    }
                }

                query.append(" )");
            }

            List<Long> requirementIds = filterRequestDTO.getRequirementIds();
            if (requirementIds != null && !requirementIds.isEmpty()) {
                query.append(" AND (");

                for (Long requirementId : requirementIds) {
                    if (requirementId == 0) {
                        query.append(" i.requirement IS NULL");
                    } else {
                        query.append(" i.requirement.issueId = '" + requirementId + "'");
                    }

                    if (!requirementId.equals(requirementIds.get(requirementIds.size() - 1))) {
                        query.append(" OR");
                    }
                }

                query.append(" )");
            }
        }

        // if (roles.contains("ROLE_TRAINER")) {

        // } else if (roles.contains("ROLE_SUPPORTER")) {
        // query.append(" AND cs.classes.userSupporter.accountName = '" +
        // user.getAccountName() + "' ");
        // }

        // if (filterGroupId != null) {
        // query.append(" AND i.group.groupId = '" + filterGroupId + "'");
        // }

        // if (filterAsigneeName != null) {
        // query.append(" AND i.asignee.accountName = '" + filterAsigneeName + "'");
        // }

        // if (filterTypeId != null) {
        // query.append(" AND i.type.classSettingId = '" + filterTypeId + "'");
        // }

        // if (filterRequirementId != null) {
        // query.append(" AND i.requirement.issueId = '" + filterRequirementId + "'");
        // }

        // if (filterStatusId != null) {
        // if (filterStatusId == 1 ) {
        // query.append(" AND i.isClosed = 0");
        // } else if (filterStatusId == 0) {
        // query.append(" AND i.isClosed = 1");
        // } else {
        // query.append(" AND i.status.classSettingId = '" + filterStatusId + "'");
        // }
        // }

        StringBuilder queryCount = new StringBuilder(
                query.toString().replaceAll("SELECT i", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Issue> typedQuery = em.createQuery(query.toString(), Issue.class);
        System.out.println(query.toString());
        IssueQuery result = new IssueQuery(typedQuery, countQuery);
        return result;
    }
}
