package swp490.g23.onlinelearningsystem.auth.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.auth.domain.AuthRequest;


public interface IAuthService {
    ResponseEntity<?> authenticate(AuthRequest request);
}
