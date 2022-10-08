package swp490.g23.onlinelearningsystem.entities.permission.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.permission.domain.response.PermissionResponseDTO;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.PermissionRepositories;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.criteria.PermissionCriteria;
import swp490.g23.onlinelearningsystem.entities.permission.service.IPermissionService;

@Service
public class PermissionService implements IPermissionService {

    @Autowired
    PermissionCriteria permissionCriteria;

    @Autowired
    PermissionRepositories permissionRepositories;

    @Override
    public ResponseEntity<List<PermissionResponseDTO>> getPermission() {
        List<SettingPermission> result = permissionRepositories.findAll();
        List<PermissionResponseDTO> resultDto = new ArrayList<>();

        for (SettingPermission sp : result) {
            resultDto.add(new PermissionResponseDTO(sp.getRole().getSettingTitle(), sp.getScreen().getSettingTitle(),
                    sp.getScreen().getSettingValue(),
                    sp.isCanGetAll(), sp.isCanEdit(), sp.isCanDelete(), sp.isCanAdd()));
        }

        return ResponseEntity.ok(resultDto);
    }
}
