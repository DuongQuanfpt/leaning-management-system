package swp490.g23.onlinelearningsystem.entities.permission.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.permission.domain.response.PermissionResponseDTO;

public interface IPermissionService {
    ResponseEntity<List<PermissionResponseDTO>> getPermission();

    ResponseEntity<String> editPermission();
}
