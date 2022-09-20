package swp490.g23.onlinelearningsystem.entities.auth.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.bytebuddy.utility.RandomString;
import swp490.g23.onlinelearningsystem.entities.auth.domain.request.AuthRequest;
import swp490.g23.onlinelearningsystem.entities.auth.service.impl.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * login api
     * @param request // login info sent from client
     * @return an access token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {
    
        return authService.authenticate(request);
    }

    /**
     * register api
     * @param request // email , fullName sent from client
     * @return 
     */

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest request) {
        
        String generatedPassword = RandomString.make(10);
        return authService.register(request,generatedPassword);
    }
}
