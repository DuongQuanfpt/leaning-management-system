package swp490.g23.onlinelearningsystem.entities.setting.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

public interface SettingRepositories extends JpaRepository<Setting, Long> {
   
    Setting findBySettingValue(String settingValue);

    @Query(value = "SELECT s FROM Setting s WHERE s.type IS NULL")
    List<Setting> findAllType();

    @Query(value = "SELECT * FROM setting WHERE setting_value= ?1 AND status = 'ACTIVE'", nativeQuery = true)
    Setting findActiveSettingByValue(String settingValue);

    Page<Setting>findByTypeNotNull(Pageable pageable);

    Long countByTypeNotNull();

    Setting findBySettingTitle(String name);

    @Query(value = "SELECT s FROM Setting s WHERE s.type = 2")
    List<Setting> roleList();

}





