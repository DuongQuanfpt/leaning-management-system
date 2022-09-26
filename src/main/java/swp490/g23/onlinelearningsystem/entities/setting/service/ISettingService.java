package swp490.g23.onlinelearningsystem.entities.setting.service;

import org.springframework.http.ResponseEntity;

public interface ISettingService {
    ResponseEntity<?> displaySettings(int limit, int currentPage);
    ResponseEntity<?> viewSetting(long id);
    ResponseEntity<?> updateSetting();
}
