package swp490.g23.onlinelearningsystem.entities.class_user.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;

public interface ClassUserRepositories extends JpaRepository<ClassUser, Long> {

    List<ClassUser> findByClasses(Classes classes);

    @Query(value = "SELECT u FROM ClassUser u WHERE u.classes.code = :classCode AND u.user.userId = :userId")
    ClassUser findByClassesAndUser(Long userId, String classCode);

    @Query(value = "SELECT u FROM ClassUser u WHERE u.classes.code = :classCode AND u.user.accountName = :username")
    ClassUser findByClassesAndUserName(String username, String classCode);

}
