package swp490.g23.onlinelearningsystem.entities.submit.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;

public interface SubmitRepository extends JpaRepository<Submit, Long> {

    @Query(value = "SELECT s FROM Submit s WHERE s.milestone.milestoneId = :milestoneId AND s.group IS NULL")
    List<Submit> getNoGroupMember(Long milestoneId);

    @Query(value = "SELECT s FROM Submit s WHERE s.milestone.milestoneId = :milestoneId AND s.group.groupCode = :groupCode AND s.classUser.user.accountName = :userName")
    Submit getMemberFromMilestone(Long milestoneId, String groupCode, String userName);
}
