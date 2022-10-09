package swp490.g23.onlinelearningsystem.entities.user.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.contact.domain.WebContact;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.util.enumutil.UserStatus;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class User extends BaseEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column
    private String fullName;

    @Column(name= "username", unique = true)
    private String accountName;

    @Column(name = "email", length = 40, unique = true)
    private String email;

    @Column
    private String mobile;

    @Column
    private String password;

    @Column
    private String avatar_url;

    @Column
    private String mailToken;

    @Column
    private UserStatus status;

    @Column
    private String note;

    @ManyToMany
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "userId", referencedColumnName = "userId"), inverseJoinColumns = @JoinColumn(name = "roleId", referencedColumnName = "settingId"))
    private List<Setting> settings = new ArrayList<>();

    @OneToMany(mappedBy = "userTrainer")
    private List<Classes> classes;

    @OneToMany(mappedBy = "userSupporter")
    private List<Classes> classList;

    @OneToMany(mappedBy = "user")
    private List<ClassUser> classUsers;

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @OneToMany(mappedBy = "manager")
	private List<Subject> managedSubject = new ArrayList<>();

    @OneToMany(mappedBy = "expert")
	private List<Subject> expertSubject = new ArrayList<>();

    @OneToMany(mappedBy = "staff")
	private List<WebContact> webContact = new ArrayList<>();


    public User(String email, String password, Setting settings) {
        this.email = email;
        this.password = password;
        this.addRole(settings);
        this.setStatus(UserStatus.Active);
    }

    public void addRole(Setting role) {
        this.settings.add(role);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<SimpleGrantedAuthority> authorities = new ArrayList<>();
        for (Setting setting : settings) {
            authorities.add(new SimpleGrantedAuthority(setting.getSettingValue()));
        }
        return authorities;
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
