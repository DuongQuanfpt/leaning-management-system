package swp490.g23.onlinelearningsystem.auth.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.auth.domain.AuthRequest;
import swp490.g23.onlinelearningsystem.auth.domain.AuthResponse;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.JwtTokenUtil;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtTokenUtil tokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody @Valid AuthRequest request){
        try {
           Authentication authentication = authenticationManager.authenticate(
               new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
           );
           User user = (User) authentication.getPrincipal();
           String accessToken = tokenUtil.generateAccessToken(user);
           AuthResponse response = new AuthResponse(user.getEmail(), accessToken);
           return ResponseEntity.ok(response);
        } catch (BadCredentialsException e) {
           return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

}
