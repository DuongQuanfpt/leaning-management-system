package swp490.g23.onlinelearningsystem.entities.setting.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

public interface SettingRepositories extends JpaRepository<Setting, Long> {
    @Query(value = "SELECT * FROM setting WHERE setting_value= ?1 AND status = 'ACTIVE'",nativeQuery = true)
    Setting findBySettingValue (String settingValue);

    @Query(value = "SELECT * FROM setting WHERE type_id IS NULL",nativeQuery = true)
    List<Setting> findAllType ();
}