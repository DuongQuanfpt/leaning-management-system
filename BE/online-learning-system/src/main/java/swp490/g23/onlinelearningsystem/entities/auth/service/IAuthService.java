package swp490.g23.onlinelearningsystem.entities.auth.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.auth.domain.request.AuthRequest;


public interface IAuthService {
    ResponseEntity<?> authenticate(AuthRequest request);
    ResponseEntity<?> register(AuthRequest request,String generatedPassword);
    ResponseEntity<?> verifyUser(String token);
}
