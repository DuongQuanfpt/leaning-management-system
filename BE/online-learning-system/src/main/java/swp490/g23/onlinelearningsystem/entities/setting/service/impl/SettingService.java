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
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoObjectException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.NoSettingException;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.ObjectDuplicateException;
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
        System.out.print("ACVVVVV : " + setting.getType().getSettingValue());
        if (setting.getType() == null || setting.getType().getSettingValue().equals("TYPE_ROLE")
                || setting.getType().getSettingValue().equals("TYPE_API")
                || setting.getType().getSettingValue().equals("TYPE_SCREEN")) {
            throw new NoObjectException("this setting cant be view");
        }

        return ResponseEntity.ok(toDTO(setting));
    }

    @Override
    public ResponseEntity<String> updateSetting(SettingRequestDTO dto, Long id) {
        Setting setting = settingRepositories.findById(id).orElseThrow(NoSettingException::new);

        if (setting.getType() == null || setting.getType().getSettingValue().equals("TYPE_ROLE")
                || setting.getType().getSettingValue().equals("TYPE_API")
                || setting.getType().getSettingValue().equals("TYPE_SCREEN")) {
            throw new NoObjectException("this setting cant be update");
        }

        if (dto.getSettingTitle() != null) {
            setting.setSettingTitle(dto.getSettingTitle());
        }

        if (dto.getSettingValue() != null && setting.getSettingValue().equals(dto.getSettingValue())== false) {
            if (settingRepositories.findBySettingValue(dto.getSettingValue()) == null) {
                setting.setSettingValue(dto.getSettingValue());
            } else {
                throw new ObjectDuplicateException("Setting Value already exist");
            }
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

        for (Setting setting : allType) {
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
        List<SettingResponseDTO> dto = new ArrayList<>();
        for (Setting s : list) {
            dto.add(toDTO(s));
        }

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<String> updateStatus(Long id) {
        Setting setting = settingRepositories.findById(id).get();
        if (setting.getType() != null) {
            if (setting.getStatus() == Status.Active) {
                setting.setStatus(Status.Inactive);
            } else {
                setting.setStatus(Status.Active);
            }
            settingRepositories.save(setting);
            return ResponseEntity.ok("Setting status updated");
        }
        return ResponseEntity.ok("Cant view this setting");
    }

    @Override
    public ResponseEntity<String> addSetting(SettingRequestDTO requestDTO) {
        Setting setting = new Setting();
        if (requestDTO.getSettingTitle() != null) {
            setting.setSettingTitle(requestDTO.getSettingTitle());
        }

        if (requestDTO.getSettingValue() != null) {
            if (settingRepositories.findBySettingValue(requestDTO.getSettingValue()) == null) {
                setting.setSettingValue(requestDTO.getSettingValue());
            } else {
                throw new ObjectDuplicateException("Setting Value already exist");
            }
        }

        Setting typeCheck = settingRepositories.findBySettingValue(requestDTO.getTypeValue());
        if (typeCheck != null) {
            setting.setType(typeCheck);
        } else {
            throw new NoObjectException("Type doesnt exist");
        }

        setting.setStatus(Status.getFromValue(Integer.parseInt(requestDTO.getStatus())).get());

        if (requestDTO.getDisplayOrder() != null) {
            setting.setDisplayOrder(requestDTO.getDisplayOrder());
        }

        if (requestDTO.getDescription() != null) {
            setting.setDescription(requestDTO.getDescription());
        }

        settingRepositories.save(setting);
        return ResponseEntity.ok("Setting added");
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
