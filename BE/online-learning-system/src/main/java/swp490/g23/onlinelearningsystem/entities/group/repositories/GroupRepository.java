package swp490.g23.onlinelearningsystem.entities.group.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByGroupCode(String groupCode);

    @Query(value = "SELECT g FROM Group g JOIN g.submits as s WHERE s.milestone.milestoneId = :id AND s.classUser IS NULL")
    List<Group> findGroupByMilestone(Long id);
}
