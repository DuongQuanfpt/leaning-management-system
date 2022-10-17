package swp490.g23.onlinelearningsystem.entities.class_user.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;

public interface ClassUserRepositories extends JpaRepository<ClassUser, Long> {

    @Query(value = "SELECT u FROM ClassUser u WHERE u.classes.code = :classCode AND u.user.userId = :userId")
    ClassUser findByClassesAndUser(Long userId, String classCode);
}
