package swp490.g23.onlinelearningsystem.entities.work_update.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;

public interface WorkUpdateRepository extends JpaRepository<WorkUpdate,Long> {
    
}
