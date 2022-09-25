package swp490.g23.onlinelearningsystem.entities.setting.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.domain.filter.SettingFilterDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.TypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.service.ISettingService;
import swp490.g23.onlinelearningsystem.util.EnumEntity.RoleStatusEnum;

@Service
public class SettingService implements ISettingService {

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<?> getSettingFilter() {
        SettingFilterDTO filterDTO = new SettingFilterDTO();
        List<TypeResponseDTO> typeResponseDTOs = new ArrayList<>();

        for (Setting setting : settingRepositories.findAllType()) {
            typeResponseDTOs.add(new TypeResponseDTO(
                setting.getSettingTitle(), setting.getSettingValue()));    
        }

        filterDTO.setTypeFilter(typeResponseDTOs);
        filterDTO.setStatusFilter(List.of(RoleStatusEnum.ACTIVE.toString(),RoleStatusEnum.INACTIVE.toString()));
        return ResponseEntity.ok(filterDTO);
    }
}
