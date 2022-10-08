package swp490.g23.onlinelearningsystem.entities.setting.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.setting.domain.filter.SettingFilterDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.request.SettingRequestDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponseDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponsePaginateDTO;

public interface ISettingService {

    ResponseEntity<SettingResponseDTO> viewSetting(long id);

    ResponseEntity<String> updateSetting(SettingRequestDTO dto, Long id);

    ResponseEntity<String> updateStatus(Long id);

    ResponseEntity<SettingFilterDTO> getFilter();

    ResponseEntity<List<SettingResponseDTO>> getScreen();

    ResponseEntity<SettingResponsePaginateDTO> displaySettings(int limit, int currentPage, String keyword,
            String statusFilter, String typeFilter);
}
