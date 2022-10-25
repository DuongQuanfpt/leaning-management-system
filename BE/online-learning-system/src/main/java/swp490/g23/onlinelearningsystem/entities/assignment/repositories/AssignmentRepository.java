package swp490.g23.onlinelearningsystem.entities.assignment.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    Assignment findByTitle(String title);

    @Query(value = "SELECT a FROM Assignment a WHERE a.forSubject.subjectStatus = '1'")
    List<Assignment> findAssigmentWithActiveSubject();
}
