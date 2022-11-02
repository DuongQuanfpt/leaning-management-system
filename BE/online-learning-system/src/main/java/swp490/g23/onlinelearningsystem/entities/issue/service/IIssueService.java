package swp490.g23.onlinelearningsystem.entities.issue.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;

public interface IIssueService {
    ResponseEntity<IssueListDTO> getIssueList();
}
