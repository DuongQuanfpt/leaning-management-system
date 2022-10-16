package swp490.g23.onlinelearningsystem.entities.user_roles.domain;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@Entity
@Table(name = "user_role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRoles extends BaseEntity {
    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private UserRolesKey key = new UserRolesKey();

    @ManyToOne()
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Setting role;

    @Column
    boolean isLeader;

    public UserRoles(User user, Setting role) {
        this.user = user;
        this.role = role;
    }

    public UserRoles(User user, Setting role, boolean isLeader) {
        this.user = user;
        this.role = role;
        this.isLeader = isLeader;
    }

    
    
}
