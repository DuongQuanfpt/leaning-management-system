package swp490.g23.onlinelearningsystem.entities.class_setting.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;

public interface ClassSettingRepository extends JpaRepository<ClassSetting, Long> {

    @Query(value = "SELECT c FROM ClassSetting c WHERE c.type.settingValue = 'TYPE_CLASS_MODULE' AND c.classes.code = :clazz")
    List<ClassSetting> findByClassAndSlot(String clazz);

    @Query(value = "SELECT c FROM ClassSetting c WHERE (c.type.settingValue = 'TYPE_ISSUE_TYPE' OR c.type.settingValue = 'TYPE_ISSUE_STATUS') "
            + " AND c.classes.code = :classCode AND c.status = swp490.g23.onlinelearningsystem.enums.Status.Active ")
    List<ClassSetting> getTypeAndStatusOfClass(String classCode);

    @Query(value = "SELECT c FROM ClassSetting c WHERE c.settingValue = :value AND c.classes.code = :clazz")
    ClassSetting findByValueAndClass(String value, String clazz);
}
