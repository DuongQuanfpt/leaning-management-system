package swp490.g23.onlinelearningsystem.entities.setting.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.domain.filter.SettingFilterDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.request.SettingRequestDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponseDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.SettingResponsePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.setting.domain.response.TypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.criteria.SettingRepositoriesCriteria;
import swp490.g23.onlinelearningsystem.entities.setting.service.ISettingService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoSettingException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class SettingService implements ISettingService {

    @Autowired
    private SettingRepositoriesCriteria settingCriteria;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<SettingResponsePaginateDTO> displaySettings(int limit, int currentPage, String keyword,
            String statusFilter, String typeFilter) {

        List<SettingResponseDTO> list = new ArrayList<>();
        TypedQuery<Setting> queryResult = settingCriteria.displaySetting(keyword, typeFilter, statusFilter);

        int totalItem = queryResult.getResultList().size();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((currentPage - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (Setting setting : queryResult.getResultList()) {
            list.add(toDTO(setting));
        }

        SettingResponsePaginateDTO dto = new SettingResponsePaginateDTO();
        dto.setPage(currentPage);
        dto.setTotalItem(totalItem);
        dto.setListResult(list);
        dto.setTotalPage(totalPage);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<SettingResponseDTO> viewSetting(long id) {
        Setting setting = settingRepositories.findById(id).get();
        return ResponseEntity.ok(toDTO(setting));
    }
    

    @Override
    public ResponseEntity<String> updateSetting(SettingRequestDTO dto, Long id) {
        Setting setting = settingRepositories.findById(id).orElseThrow(NoSettingException::new);

        if (dto.getSettingTitle() != null) {
            setting.setSettingTitle(dto.getSettingTitle());
        }

        if (dto.getDisplayOrder() != null) {
            setting.setDisplayOrder(dto.getDisplayOrder());
        }

        if (dto.getDisplayOrder() != null) {
            setting.setDescription(dto.getDescription());
        }

        if (dto.getStatus() != null) {
            setting.setStatus(Status.getFromValue(Integer.parseInt(dto.getStatus())).get());
        }

        settingRepositories.save(setting);
        return ResponseEntity.ok("Setting has been udated");
    }

    @Override
    public ResponseEntity<SettingFilterDTO> getFilter() {

        List<TypeResponseDTO> list = new ArrayList<>();
        List<StatusEntity> statuses = new ArrayList<>();
        List<Setting> allType = settingRepositories.findFilteredType();

        for (Setting setting :allType ) {
            list.add(new TypeResponseDTO(setting.getSettingTitle(), setting.getSettingValue()));
        }

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statuses.add(new StatusEntity(status));
        }

        SettingFilterDTO filterDTO = new SettingFilterDTO();

        filterDTO.setStatusFilter(statuses);
        filterDTO.setTypeFilter(list);

        return ResponseEntity.ok(filterDTO);
    }

    @Override
    public ResponseEntity<List<SettingResponseDTO>> getScreen() {
        List<Setting> list = settingRepositories.findAllScreen();
        List<SettingResponseDTO> dto= new ArrayList<>();
        for (Setting s : list) {
            dto.add(toDTO(s));
        }
        
        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id) {
        Setting setting = settingRepositories.findById(id).get();
        if (setting.getType() != null) {
            if (setting.getStatus() == Status.ACTIVE) {
                setting.setStatus(Status.INACTIVE);
            } else {
                setting.setStatus(Status.ACTIVE);
            }
            settingRepositories.save(setting);
            return ResponseEntity.ok("Setting status updated");
        }
        return ResponseEntity.ok("Cant view this setting");
    }

    // public Setting toEntity(Setting requestDTO) {
    // User entity = new User();

    // if (requestDTO.getUserId() != null) {
    // entity.setUserId(requestDTO.getUserId());
    // }
    // entity.setFullName(requestDTO.getFullName());
    // entity.setEmail(requestDTO.getEmail());
    // entity.setMobile(requestDTO.getMobile());
    // entity.setPassword(requestDTO.getPassword());
    // entity.setNote(requestDTO.getNote());
    // entity.setStatus(requestDTO.getStatus());
    // entity.setAvatar_url(requestDTO.getAvatar_url());

    // return entity;
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
