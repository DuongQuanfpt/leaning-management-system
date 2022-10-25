package swp490.g23.onlinelearningsystem.entities.milestone.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;

public interface MilestoneRepository extends JpaRepository<Milestone, Long> {
<<<<<<< HEAD
    @Query(value = "SELECT m FROM Milestone m WHERE m.status = swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum.Open")
    List<Milestone> getActiveMilestone();
=======

    @Query(value = "SELECT m FROM Milestone m WHERE m.classes.status = '1'")
    List<Milestone> findByActiveClass();

    Milestone findByTitle(String title);
>>>>>>> 648996c1b80702a2053e7cea04afc84a87252e77
}
