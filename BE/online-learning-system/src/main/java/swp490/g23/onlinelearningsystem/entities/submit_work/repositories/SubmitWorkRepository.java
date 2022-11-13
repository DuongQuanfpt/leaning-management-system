package swp490.g23.onlinelearningsystem.entities.submit_work.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWorkKey;

public interface SubmitWorkRepository extends JpaRepository<SubmitWork ,SubmitWorkKey> {
    @Transactional
    @Modifying
    @Query(value = "DELETE FROM SubmitWork sk WHERE sk.submit = :submit ")
    int removeWorkOfSubmit(Submit submit);

}
