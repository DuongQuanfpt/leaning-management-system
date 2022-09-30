package swp490.g23.onlinelearningsystem.entities.permission.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
public interface PermissionRepositories extends JpaRepository<SettingPermission, Long> {
    
    @Query(value = "SELECT p FROM SettingPermission p WHERE p.role.settingValue = :role AND :url LIKE CONCAT('', p.screen.settingValue, '%') ")
    SettingPermission findPermissionForScreen(String url ,String role);
}
