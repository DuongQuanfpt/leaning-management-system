package swp490.g23.onlinelearningsystem.entities.issue.service;


import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueBatchRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueResponseDTO;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface IIssueService {
    ResponseEntity<IssueListDTO> getIssueList(int page, int limit, String keyword, Long filterStatus,
            Long filterMilestoneId, Long filterGroupId ,String filterAsigneeName, Long filterTypeValue ,String classCode,Long filterRequirementId);
    ResponseEntity<IssueFilter> issueListFilter(String classCode);
    ResponseEntity<IssueFilter> issueAddFilter(String classCode , User user);      
    ResponseEntity<String> issueAdd(String classCode , IssueRequestDTO requestDTO , User user);
    ResponseEntity<String> issueEdit(Long issueId , IssueRequestDTO requestDTO , User user);
    ResponseEntity<String> updateBatchIssue(IssueBatchRequestDTO requestDTO , User user);
    ResponseEntity<IssueResponseDTO> issueDetail(Long issueId);      
}
