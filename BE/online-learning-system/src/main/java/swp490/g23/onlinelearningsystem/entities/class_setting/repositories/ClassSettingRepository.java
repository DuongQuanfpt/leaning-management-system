package swp490.g23.onlinelearningsystem.entities.class_setting.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;

public interface ClassSettingRepository extends JpaRepository<ClassSetting, Long>{
    
}
