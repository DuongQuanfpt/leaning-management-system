package swp490.g23.onlinelearningsystem.entities.auth.service;

import java.io.IOException;
import java.security.GeneralSecurityException;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.auth.domain.request.AuthRequest;
import swp490.g23.onlinelearningsystem.entities.auth.domain.request.GoogleAuthRequest;
import swp490.g23.onlinelearningsystem.entities.auth.domain.response.AuthResponse;


public interface IAuthService {
    ResponseEntity<AuthResponse> authenticate(AuthRequest request); // login user
    ResponseEntity<String> register(AuthRequest request,String generatedPassword);//create new user and sent verify link to user email
    ResponseEntity<String> verifyUser(String token);//set user status to ACTIVE
    ResponseEntity<AuthResponse> googleAuthenticate(GoogleAuthRequest authRequest) throws GeneralSecurityException, IOException;//set user status to ACTIVE
}
