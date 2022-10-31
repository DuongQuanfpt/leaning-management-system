package swp490.g23.onlinelearningsystem.entities.classes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

public interface ClassRepositories extends JpaRepository<Classes, Long> {

    List<Classes> findByCode(String code);

    @Query(value = "SELECT c FROM Classes c WHERE c.code = :clazz")
    Classes findClassByCode(String clazz);

    @Query(value = "SELECT c FROM Classes c WHERE c.userSupporter.accountName = :userName OR c.userTrainer.accountName = :userName")
    List<Classes> getClassByUser(String userName);

    @Query(value = "SELECT c FROM Classes c WHERE c.status = '1'")
    List<Classes> findClassesActive();

    @Query(value = "SELECT c FROM Classes c JOIN c.userTrainer as t WHERE t.accountName = :trainer")
    List<Classes> findClassTrainerAssigned(String trainer);

    @Query(value = "SELECT c FROM Classes c JOIN c.userSupporter as s WHERE s.accountName = :supporter")
    List<Classes> findClassSupporterAssigned(String supporter);
}
