package swp490.g23.onlinelearningsystem.entities.class_user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;

public interface ClassUserRepositories extends JpaRepository<ClassUser, Long>{
    
}
