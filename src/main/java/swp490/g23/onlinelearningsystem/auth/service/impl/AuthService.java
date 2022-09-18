package swp490.g23.onlinelearningsystem.auth.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import swp490.g23.onlinelearningsystem.auth.domain.AuthRequest;
import swp490.g23.onlinelearningsystem.auth.domain.AuthResponse;
import swp490.g23.onlinelearningsystem.auth.service.IAuthService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;

public class AuthService implements IAuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenUtil tokenUtil;
    
    @Override
    public ResponseEntity<?> authenticate( AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = (User) authentication.getPrincipal();
        String accessToken = tokenUtil.generateAccessToken(user);
        AuthResponse response = new AuthResponse(user.getEmail(), accessToken);
        return ResponseEntity.ok(response);
    }
    
}
