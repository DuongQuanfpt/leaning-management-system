package swp490.g23.onlinelearningsystem.entities.permission.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;

public interface PermissionRepositories extends JpaRepository<SettingPermission, Long> {
    
}
