package swp490.g23.onlinelearningsystem.entities.work_update.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;

public interface WorkUpdateRepository extends JpaRepository<WorkUpdate, Long> {
    @Query(value = "SELECT wu FROM WorkUpdate wu WHERE wu.submit = :submit AND wu.requirement = :requirement")
    List<WorkUpdate> getUpdateOfSubmitAndRequirement(Submit submit, Issue requirement);
}
