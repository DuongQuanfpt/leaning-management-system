package swp490.g23.onlinelearningsystem.auth.domain;

import javax.validation.constraints.Email;
import javax.validation.constraints.Pattern;

public class AuthRequest {
    @Email
    private String email;

    @Pattern(regexp="[^\s]{4,30}")
    private String password;
    
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
}
