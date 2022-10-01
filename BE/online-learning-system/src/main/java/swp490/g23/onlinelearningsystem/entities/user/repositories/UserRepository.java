package swp490.g23.onlinelearningsystem.entities.user.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM user WHERE user_id= ?1 AND status = 'ACTIVE'",nativeQuery = true)
    User findUserById(Long id);

    User findByMailToken(String mailToken);

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM user WHERE email= ?1 AND status = 'ACTIVE'",nativeQuery = true)
    User findActiveUserByEmail(String email);

    @Query(value = "SELECT * FROM user WHERE email= ?1",nativeQuery = true)
    User findUserWithEmail(String email);

    // List<User> findBySettings(List<Setting> settings);
}
