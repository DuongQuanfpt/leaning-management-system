package swp490.g23.onlinelearningsystem.entities.issue.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueResponseDTO;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.Criteria.IssueCriteria;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.CriteriaEntity.IssueQuery;
import swp490.g23.onlinelearningsystem.entities.issue.service.IIssueService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;

@Service
public class IssueService implements IIssueService {

    @Autowired
    private IssueCriteria issueCriteria;

    @Override
    public ResponseEntity<IssueListDTO> getIssueList(int page, int limit, String keyword, String filterStatus,
            Long filterMilestoneId, Long filterGroupId, String filterAsigneeName,
            String filterTypeValue) {
        List<Milestone> milestones = new ArrayList<>();
        List<IssueResponseDTO> dtos = new ArrayList<>();

        IssueQuery result = issueCriteria.searchFilterQuery(keyword, filterStatus, filterMilestoneId, filterGroupId,
                filterAsigneeName, filterTypeValue);
        TypedQuery<Issue> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<IssueResponseDTO> issueResponseDTOs = new ArrayList<>();

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        List<Issue> issues = queryResult.getResultList();
        for (Issue issue : issues) {
            
        }

        IssueListDTO dto = new IssueListDTO();
        dto.setTotalPage(totalPage);
        dto.setIssueList(dtos);
        return ResponseEntity.ok(dto);
    }

    public IssueResponseDTO toDto(Issue issue) {
        return null;
    }

    public IssueMilestoneDTO toMilestoneDto(Milestone milestone) {
        return null;
    }

}
