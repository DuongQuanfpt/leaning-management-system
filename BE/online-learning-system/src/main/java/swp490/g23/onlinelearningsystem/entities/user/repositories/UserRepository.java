package swp490.g23.onlinelearningsystem.entities.user.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT u FROM User u WHERE u.userId= :id AND u.status = :statusEnum")
    User findUserById(Long id, UserStatus statusEnum);

    User findByMailToken(String mailToken);

    User findByAccountName(String accountName);

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT u FROM User u WHERE u.email= :email " +
            "AND u.status = swp490.g23.onlinelearningsystem.util.enumutil.UserStatus.Active")
    User findActiveUserByEmail(String email);

    @Query(value = "SELECT u FROM User u WHERE u.email= ?1")
    User findUserWithEmail(String email);

    @Query(value = "SELECT u FROM User u WHERE u.accountName = :accountName " +
            "AND u.status = swp490.g23.onlinelearningsystem.util.enumutil.UserStatus.Active")
    User findActiveByAccountName(String accountName);

    @Query(value = "SELECT DISTINCT u FROM User u INNER JOIN u.settings as s WHERE s.settingValue = 'ROLE_TRAINER' OR s.settingValue = 'ROLE_SUPPORTER'")
    List<User> findTrainerAndSupporter();

    @Query(value = "SELECT DISTINCT u FROM User u INNER JOIN u.settings as s WHERE s.settingValue = 'ROLE_MANAGER' OR s.settingValue = 'ROLE_EXPERT'")
    List<User> findManagerAndExpert();

    @Query(value = "SELECT DISTINCT u FROM User u INNER JOIN u.settings as s WHERE s.settingValue = 'ROLE_SUPPORTER'")
    List<User> findSupport();

    @Query(value = "SELECT u FROM User u WHERE u.accountName = :accountName AND u.email <> :email")
    List<User> findDupeAccountName(String accountName, String email);

    @Query(value = "SELECT u FROM User u WHERE u.accountName LIKE %:accountName% ")
    List<User> getUserWithAccNameStartWith(String accountName);

    @Query(value = "SELECT DISTINCT u FROM User u JOIN u.issueOfAsignee as i WHERE i.classes.code = :classCode ")
    List<User> getIssueAsigneeOfClass(String classCode);

    @Query(value = "SELECT DISTINCT u FROM User u JOIN u.issueOfAsignee as i WHERE i.classes.code = :classCode AND i.milestone IS NULL ")
    List<User> getIssueAsigneeOfGeneral(String classCode);

    List<User> findByFullName(String fullName);
}
