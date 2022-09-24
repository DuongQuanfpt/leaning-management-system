package swp490.g23.onlinelearningsystem.entities.setting.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

public interface SettingRepositories extends JpaRepository<Setting, Long> {
    Setting findBySettingValue (String settingValue);
}
