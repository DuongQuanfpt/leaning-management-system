package swp490.g23.onlinelearningsystem.entities.submit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;

public interface SubmitRepository extends JpaRepository<Submit, Long> {

    List<Submit> findByClassUserAndGroupIsNull(ClassUser classUser);

    @Query(value = "SELECT s FROM Submit s WHERE s.milestone.milestoneId = :milestoneId AND s.group IS NULL")
    List<Submit> getNoGroupMember(Long milestoneId);

    @Query(value = "SELECT s FROM Submit s WHERE s.milestone.milestoneId = :milestoneId AND s.group.groupId = :groupId AND s.classUser.user.accountName = :userName")
    Submit getMemberFromMilestone(Long milestoneId, Long groupId, String userName);

    @Query(value = "SELECT s FROM Submit s WHERE s.group.groupId = :groupId AND s.classUser.user.accountName = :userName")
    List<Submit> getFromGroupAndUserName(Long groupId, String userName);

    @Query(value = "SELECT s FROM Submit s WHERE s.milestone IN (:milestones) AND s.group IS NULL AND s.classUser = :classUser")
    List<Submit> getByClassUserInMilestones(List<Milestone> milestones , ClassUser classUser);
    
}
