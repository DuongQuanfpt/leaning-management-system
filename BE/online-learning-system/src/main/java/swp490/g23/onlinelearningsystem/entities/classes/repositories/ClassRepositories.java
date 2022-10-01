package swp490.g23.onlinelearningsystem.entities.classes.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

public interface ClassRepositories extends JpaRepository<Classes, Long>{
    
    

}
