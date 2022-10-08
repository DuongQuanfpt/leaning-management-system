package swp490.g23.onlinelearningsystem.entities.permission.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

public interface PermissionRepositories extends JpaRepository<SettingPermission, Long> {

    // @Query(value = "SELECT p FROM SettingPermission p WHERE p.role.settingValue =
    // :role AND :url LIKE CONCAT('', p.screen.settingValue, '%') ")
    // SettingPermission findPermissionForScreen(String url ,String role);

    List<SettingPermission> findByScreen(Setting screen);
}
