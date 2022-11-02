package swp490.g23.onlinelearningsystem.entities.issue.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;

public interface IssueRepository extends JpaRepository<Issue,Long> {
    
}
