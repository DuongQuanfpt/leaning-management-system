package swp490.g23.onlinelearningsystem.entities.issue.repositories.Criteria;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import lombok.RequiredArgsConstructor;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueFilterRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.CriteriaEntity.IssueQuery;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Repository
@RequiredArgsConstructor
public class IssueCriteria {
    private final EntityManager em;

    @Autowired
    private MilestoneRepository milestoneRepository;

    public IssueQuery searchFilterQuery(String keyword, String classCode, boolean isIssue, Long filterMilestoneId,
            IssueFilterRequestDTO filterRequestDTO, User user) {

        List<Setting> settings = user.getSettings();
        List<String> roles = new ArrayList<>();
        for (Setting setting : settings) {
            roles.add(setting.getSettingValue());
        }

        StringBuilder query = new StringBuilder(
                "SELECT i FROM Issue i LEFT JOIN i.asignee as a WHERE i.classes.code = '" + classCode + "'");

        if (isIssue == false) {
            query.append(" AND i.type IS NULL");
        } else {
            query.append(" AND i.type IS NOT NULL");
        }

        if (filterMilestoneId != null && filterMilestoneId != 0) {
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
            } else {
                if (roles.contains("ROLE_TRAINEE") && filterMilestoneId != null && filterMilestoneId != 0) {
                    Milestone milestone = milestoneRepository.findById(filterMilestoneId).get();
                    if (milestone.getAssignment().isTeamWork()) {
                        for (Submit submit : milestone.getSubmits()) {
                            if (submit.getClassUser()!=null && submit.getClassUser().getUser().equals(user)) {
                                if (submit.getGroup() != null) {
                                    query.append(" AND ( i.group.groupId = '" + submit.getGroup().getGroupId() + "' OR i.group IS NULL )");  
                                } else {
                                    query.append(" AND ( i.group.groupId = '" + 0 + "' OR i.group IS NULL )");
                                }
                               break;
                            }
                        }
                    }
                }
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

        StringBuilder queryCount = new StringBuilder(
                query.toString().replaceAll("SELECT i", "SELECT COUNT(*)"));
        TypedQuery<Long> countQuery = em.createQuery(queryCount.toString(), Long.class);
        TypedQuery<Issue> typedQuery = em.createQuery(query.toString(), Issue.class);
        System.out.println(query.toString());
        IssueQuery result = new IssueQuery(typedQuery, countQuery);
        return result;
    }
}
