package swp490.g23.onlinelearningsystem.entities.group.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface GroupRepository extends JpaRepository<Group, Long> {
    Group findByGroupCode(String groupCode);

    List<Group> findBySubmitsIsNull();

    @Query(value = "SELECT g FROM Group g JOIN g.submits as s WHERE s.milestone.milestoneId = :id AND s.classUser IS NULL")
    List<Group> findGroupByMilestone(Long id);

    @Query(value = "SELECT g FROM Group g JOIN g.submits as s WHERE s.milestone = :milestone AND s.classUser.user = :user")
    Group findGroupByMilestoneAndUser(Milestone milestone, User user);


}
