package swp490.g23.onlinelearningsystem.entities.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT u FROM User u WHERE u.userId= :id AND u.status = :statusEnum")
    User findUserById(Long id , UserStatus statusEnum);

    User findByMailToken(String mailToken);

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT u FROM User u WHERE u.email= :email " +
    "AND u.status = swp490.g23.onlinelearningsystem.util.enumutil.UserStatus.ACTIVE")
    User findActiveUserByEmail(String email);

    @Query(value = "SELECT * FROM user WHERE email= ?1", nativeQuery = true)
    User findUserWithEmail(String email);

    // List<User> findBySettings(List<Setting> settings);
}
