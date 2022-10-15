package swp490.g23.onlinelearningsystem.entities.assignment.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    
}
