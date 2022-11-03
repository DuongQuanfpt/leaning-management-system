package swp490.g23.onlinelearningsystem.entities.issue.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    @Query(value = "SELECT i FROM Issue i WHERE i.classes.code = :classCode AND i.type IS NULL")
    List<Issue> getRequirementOfClass(String classCode) ;
}
