package swp490.g23.onlinelearningsystem.entities.permission.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.permission.domain.request.PermissionRequestDTO;
import swp490.g23.onlinelearningsystem.entities.permission.domain.response.PermissionResponseDTO;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.PermissionRepositories;
import swp490.g23.onlinelearningsystem.entities.permission.repositories.criteria.PermissionCriteria;
import swp490.g23.onlinelearningsystem.entities.permission.service.IPermissionService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

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
            resultDto.add(new PermissionResponseDTO(sp.getRole().getSettingTitle(), sp.getRole().getSettingValue(),
                    sp.getScreen().getSettingTitle(),
                    sp.getScreen().getSettingValue(),
                    sp.isCanGetAll(), sp.isCanEdit(), sp.isCanDelete(), sp.isCanAdd()));
        }

        return ResponseEntity.ok(resultDto);
    }

    @Override
    public ResponseEntity<String> editPermission(List<PermissionRequestDTO> requestList) {

        for (PermissionRequestDTO requestPermission : requestList) {
            SettingPermission permission = permissionRepositories.findPermission(requestPermission.getRoleValue(),
                    requestPermission.getUrl()).orElseThrow(() -> new CustomException("Setting doesnt exist"));

            permission.setCanAdd(requestPermission.isAdd());
            permission.setCanDelete(requestPermission.isDelete());
            permission.setCanEdit(requestPermission.isEdit());
            permission.setCanGetAll(requestPermission.isGet());                    

            permissionRepositories.save(permission);
        }
        return ResponseEntity.ok("Permissions updated");
    }
}
