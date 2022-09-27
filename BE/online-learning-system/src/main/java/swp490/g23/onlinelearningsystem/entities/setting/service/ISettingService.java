package swp490.g23.onlinelearningsystem.entities.setting.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.setting.domain.request.SettingRequestDTO;

public interface ISettingService {
    ResponseEntity<?> displaySettings(int limit, int currentPage);
    ResponseEntity<?> viewSetting(long id);
    ResponseEntity<?> updateSetting(SettingRequestDTO dto , Long id);
    ResponseEntity<?> updateStatus(Long id);
}
