package swp490.g23.onlinelearningsystem.entities.user.domain;

import java.util.Collection;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;

@Entity
@Table(name = "user")
@Getter @Setter @NoArgsConstructor
public class User extends BaseEntity implements UserDetails {
    @Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userId;

    @Column
	private String fullName;

	@Column(name = "email",length = 40,unique = true)
	private String email;

	@Column
	private String mobile;

	@Column
	private String password;

    @Column
	private String avatar_url;

    @Column
	private String status;

    @Column
	private String note;
    
    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getUsername() {
        
        return this.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
       
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
      
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        
        return true;
    }

    @Override
    public boolean isEnabled() {
        
        return true;
    }

    
}
