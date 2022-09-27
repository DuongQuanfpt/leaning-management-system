package swp490.g23.onlinelearningsystem.entities.auth.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.auth.domain.request.AuthRequest;


public interface IAuthService {
    ResponseEntity<?> authenticate(AuthRequest request); // login user
    ResponseEntity<?> register(AuthRequest request,String generatedPassword);//create new user and sent verify link to user email
    ResponseEntity<?> verifyUser(String token);//set user status to ACTIVE
}
