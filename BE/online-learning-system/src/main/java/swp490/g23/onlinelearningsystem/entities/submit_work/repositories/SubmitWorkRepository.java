package swp490.g23.onlinelearningsystem.entities.submit_work.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWorkKey;

public interface SubmitWorkRepository extends JpaRepository<SubmitWork ,SubmitWorkKey> {
    
}
