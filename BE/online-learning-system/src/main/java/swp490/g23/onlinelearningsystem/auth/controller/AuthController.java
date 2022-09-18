package swp490.g23.onlinelearningsystem.auth.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.auth.domain.AuthRequest;

import swp490.g23.onlinelearningsystem.auth.service.impl.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
        // try {
        // Authentication authentication = authenticationManager.authenticate(
        // new UsernamePasswordAuthenticationToken(request.getEmail(),
        // request.getPassword())
        // );
        // User user = (User) authentication.getPrincipal();
        // String accessToken = tokenUtil.generateAccessToken(user);
        // AuthResponse response = new AuthResponse(user.getEmail(), accessToken);
        // return ResponseEntity.ok(response);
        // } catch (BadCredentialsException e) {
        // return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        // }
        return authService.authenticate(request);
    }

}
