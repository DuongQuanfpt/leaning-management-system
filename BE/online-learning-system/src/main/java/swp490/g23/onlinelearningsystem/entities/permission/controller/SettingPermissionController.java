package swp490.g23.onlinelearningsystem.entities.permission.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.permission.domain.response.PermissionResponseDTO;
import swp490.g23.onlinelearningsystem.entities.permission.service.impl.PermissionService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@RestController
@CrossOrigin(exposedHeaders = "Authorization")
@RequestMapping(Setting.API_PREFIX)
public class SettingPermissionController {

    @Autowired
    PermissionService permissionService;

    @GetMapping(value = "/permission")
    public ResponseEntity<List<PermissionResponseDTO>> getSettingScreen() {

        return permissionService.getPermission();
    }
}
