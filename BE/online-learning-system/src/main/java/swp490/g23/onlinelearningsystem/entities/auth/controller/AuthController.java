package swp490.g23.onlinelearningsystem.entities.auth.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
     * 
     * @param request // login info sent from client
     * @return return an expirable token
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid AuthRequest request) {

        return authService.authenticate(request);
    }

    /**
     * register api
     * 
     * @param request // email address , fullName sent from client
     * @return assign a tokenMail to the user and sent a random generated
     *         password and a verify link to user email
     */

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid AuthRequest request) {
        String generatedPassword = RandomString.make(10);
        return authService.register(request, generatedPassword);
    }

    /**
     * Verify user
     * @param token 
     * @return set user status to ACTIVE , and mailToken to null
     */
    @GetMapping(value = "/verify")
    public ResponseEntity<?> forgotPassword(@RequestParam("token") String token) {

        return authService.verifyUser(token);
    }

    @GetMapping("/login-google")
    public String loginGoogle(@AuthenticationPrincipal OAuth2User principal) {

        String email = principal.getAttribute("email");

        return email;
    }
}
