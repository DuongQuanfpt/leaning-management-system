package swp490.g23.onlinelearningsystem.entities.classes.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

public interface ClassRepositories extends JpaRepository<Classes, Long>{
    
    List<Classes> findByCode(String code);

    @Query(value = "SELECT c FROm Classes c WHERE c.code = :clazz")
    Classes findClassByCode (String clazz);

}
