package swp490.g23.onlinelearningsystem.entities.subject_setting.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;

public interface SubjectSettingRepository extends JpaRepository<SubjectSetting, Long>{
    
}
