package swp490.g23.onlinelearningsystem.entities.classes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

public interface ClassRepositories extends JpaRepository<Classes, Long>{
    
    // @Query(value = "SELECT DISTINCT c.settingTerm FROM Class c", nativeQuery = true)
    // List<Setting> findDistinctTerm();


    // @Query(value = "SELECT DISTINCT c.settingBranch FROM Class c", nativeQuery = true)
    // List<Setting> findDistinctBranch();

}
