package swp490.g23.onlinelearningsystem.entities.setting.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponseDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.service.ISettingService;

@Service
public class SettingService implements ISettingService {

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<?> displaySettings(int limit, int currentPage) {

        Pageable pageable = PageRequest.of(currentPage - 1, limit);
        List<Setting> settings = settingRepositories.findByTypeNotNull(pageable).getContent();
        List<SettingResponseDTO> result = new ArrayList<>();

        for (Setting setting : settings) {
            result.add(toDTO(setting));
        }

        SettingResponsePaginateDTO responseDTO = new SettingResponsePaginateDTO();
        responseDTO.setPage(currentPage);
        responseDTO.setListResult(result);
        responseDTO.setTotalPage((int) Math.ceil((double) settingRepositories.count() / limit));

        return ResponseEntity.ok(responseDTO);
    }

    @Override
    public ResponseEntity<?> viewSetting(long id) {

        return ResponseEntity.ok(settingRepositories.findById(id).get());
    }

    @Override
    public ResponseEntity<?> updateSetting() {

        return null;
    }

    // public Setting toEntity(Setting requestDTO) {
    //     User entity = new User();

    //     if (requestDTO.getUserId() != null) {
    //         entity.setUserId(requestDTO.getUserId());
    //     }
    //     entity.setFullName(requestDTO.getFullName());
    //     entity.setEmail(requestDTO.getEmail());
    //     entity.setMobile(requestDTO.getMobile());
    //     entity.setPassword(requestDTO.getPassword());
    //     entity.setNote(requestDTO.getNote());
    //     entity.setStatus(requestDTO.getStatus());
    //     entity.setAvatar_url(requestDTO.getAvatar_url());

    //     return entity;
    // }

    // Convert Entity to DTO
    public SettingResponseDTO toDTO(Setting entity) {
        SettingResponseDTO responseDTO = new SettingResponseDTO();

        responseDTO.setSettingId(entity.getSettingId());
        responseDTO.setSettingTitle(entity.getSettingTitle());
        responseDTO.setSettingValue(entity.getSettingValue());
        responseDTO.setStatus(entity.getStatus());
        responseDTO.setTypeName(entity.getType().getSettingTitle());
        responseDTO.setDescription(entity.getSettingTitle());
        responseDTO.setDisplayOrder(entity.getDisplayOrder());

        return responseDTO;
    }
}
