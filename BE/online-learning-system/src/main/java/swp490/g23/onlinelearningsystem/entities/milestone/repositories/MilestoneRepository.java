package swp490.g23.onlinelearningsystem.entities.milestone.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;

public interface MilestoneRepository extends JpaRepository<Milestone, Long>{
    
}
