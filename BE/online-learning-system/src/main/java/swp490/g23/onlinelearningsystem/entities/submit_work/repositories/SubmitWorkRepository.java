package swp490.g23.onlinelearningsystem.entities.submit_work.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWorkKey;

public interface SubmitWorkRepository extends JpaRepository<SubmitWork, SubmitWorkKey> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM SubmitWork sk WHERE sk.submit = :submit ")
    int removeWorkOfSubmit(Submit submit);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM SubmitWork sk WHERE sk.submit in :submits ")
    int removeWorkOfSubmits(List<Submit> submits);

    @Query(value = "SELECT sk FROM SubmitWork sk WHERE sk.submit.group = :group AND sk.milestone = :milestone ")
    List<SubmitWork> getByGroupAndMilestone(Group group, Milestone milestone);
}
