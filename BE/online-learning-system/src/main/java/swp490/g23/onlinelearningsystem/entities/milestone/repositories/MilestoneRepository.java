package swp490.g23.onlinelearningsystem.entities.milestone.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
    @Query(value = "SELECT m FROM Milestone m WHERE m.status = swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum.Open")
    List<Milestone> getActiveMilestone();

    @Query(value = "SELECT m FROM Milestone m WHERE m.classes.status = '1'")
    List<Milestone> findByActiveClass();

    @Query(value = "SELECT DISTINCT m FROM Milestone m JOIN m.submits as ms WHERE ms.group.groupId = :groupId")
    List<Milestone> milestoneOfGroup(Long groupId);

    Milestone findByTitle(String title);
}
