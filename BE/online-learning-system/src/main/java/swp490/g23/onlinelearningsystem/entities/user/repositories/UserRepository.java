package swp490.g23.onlinelearningsystem.entities.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    User findOneByEmail(String email);
}
