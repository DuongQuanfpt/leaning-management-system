package swp490.g23.onlinelearningsystem.entities.issue.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueResponseDTO;

public interface IIssueService {
    ResponseEntity<IssueListDTO> getIssueList(int page, int limit, String keyword, Long filterStatus,
            Long filterMilestoneId, Long filterGroupId ,String filterAsigneeName, Long filterTypeValue ,String classCode,Long filterRequirementId);
    ResponseEntity<IssueFilter> issueListFilter(String classCode);      
    ResponseEntity<IssueResponseDTO> issueDetail(Long issueId);      
}
