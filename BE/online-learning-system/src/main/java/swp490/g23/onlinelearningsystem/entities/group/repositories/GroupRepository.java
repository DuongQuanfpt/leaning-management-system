package swp490.g23.onlinelearningsystem.entities.group.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;

public interface GroupRepository extends JpaRepository<Group,Long> {
    Group findByGroupCode(String groupCode);
}
