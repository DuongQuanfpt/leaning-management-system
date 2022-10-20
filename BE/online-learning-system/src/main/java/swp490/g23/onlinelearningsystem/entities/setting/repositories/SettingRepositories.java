package swp490.g23.onlinelearningsystem.entities.setting.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

public interface SettingRepositories extends JpaRepository<Setting, Long> {

    Setting findBySettingValue(String settingValue);

    Page<Setting> findByTypeNotNull(Pageable pageable);

    Long countByTypeNotNull();

    Setting findBySettingTitle(String name);

    @Query(value = "SELECT s FROM Setting s WHERE s.type.settingValue = 'TYPE_ROLE' " +
    "AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.Status.Active")
    List<Setting> findAllRole();

    @Query(value = "SELECT s FROM Setting s WHERE s.type.settingValue = 'TYPE_SCREEN' ")
    List<Setting> findAllScreen();

    @Query(value = "SELECT s FROM Setting s WHERE s.type.settingValue = 'TYPE_CONTACT' ")
    List<Setting> findAllCategory();


    @Query(value = "SELECT s FROM Setting s WHERE s.settingValue = ?1 " +
            "AND s.status = swp490.g23.onlinelearningsystem.util.enumutil.Status.Active")
    Setting findActiveSettingByValue(String settingValue);

    @Query(value = "SELECT s FROM Setting s WHERE s.type IS NULL")
    List<Setting> findAllType();

    @Query(value = "SELECT s FROM Setting s WHERE s.type IS NULL " +
    "AND s.settingValue != 'TYPE_ROLE' AND s.settingValue != 'TYPE_API' "+
    "AND s.settingValue != 'TYPE_SCREEN'")
    List<Setting> findFilteredType();

    @Query(value = "SELECT s FROM Setting s WHERE s.type.settingValue = 'TYPE_TERM'")
    List<Setting> termList();

    @Query(value = "SELECT s FROM Setting s WHERE s.type.settingValue = 'TYPE_BRANCH'")
    List<Setting> branchList();

    @Query(value = "SELECT s FROM Setting s WHERE s.type.settingValue = 'TYPE_SUBJECT_SETTING'")
    List<Setting> subjectSettingList();

    @Query(value = "SELECT s FROM Setting s WHERE s.type.settingValue = 'TYPE_CLASS_SETTING'")
    List<Setting> classSettingList();
}
