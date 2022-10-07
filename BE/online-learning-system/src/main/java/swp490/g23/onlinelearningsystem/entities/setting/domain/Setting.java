package swp490.g23.onlinelearningsystem.entities.setting.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.permission.domain.SettingPermission;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;

@Entity
@Table(name = "setting")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Setting extends BaseEntity {
    public static final String API_PREFIX = "/api";
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long settingId;

    @Column
    private String settingTitle;

    @Column(name = "setting_value", unique = true)
    private String settingValue;

    @Column

    private Status status;

    @Column
    private String description;

    @Column
    private String displayOrder;

    @ManyToOne
    @JoinColumn(name = "screen_id")
    private Setting screen;

    @OneToMany(mappedBy = "screen")
    private List<Setting> apis = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Setting type;

    @OneToMany(mappedBy = "type")
    private List<Setting> settings = new ArrayList<>();

    @ManyToMany(mappedBy = "settings")
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "settingTerm")
    private List<Classes> classesTerm = new ArrayList<>();

    @OneToMany(mappedBy = "settingBranch")
    private List<Classes> classesBranch = new ArrayList<>();

    @OneToMany(mappedBy = "screen", cascade = CascadeType.ALL)
    private List<SettingPermission> roles;

    @OneToMany(mappedBy = "role", cascade = CascadeType.ALL)
    private List<SettingPermission> screens;

    // @OneToMany(mappedBy = "api" ,cascade = CascadeType.ALL)
    // private List<SettingPermission> apis;

    public Setting(String settingTitle, String settingValue, String description) {
        this.settingTitle = settingTitle;
        this.settingValue = settingValue;
        this.description = description;
    }

    public Setting(String settingTitle, String settingValue, Status status, String description,
            String displayOrder, Setting type) {
        this.settingTitle = settingTitle;
        this.settingValue = settingValue;
        this.status = status;
        this.description = description;
        this.displayOrder = displayOrder;
        this.type = type;
    }

    public Setting(String settingTitle, String settingValue, Status status, String description,
            String displayOrder, Setting type,Setting screen) {
        this.settingTitle = settingTitle;
        this.settingValue = settingValue;
        this.status = status;
        this.description = description;
        this.displayOrder = displayOrder;
        this.type = type;
        this.screen=screen;
    }

    @Override
    public String toString() {
        return settingValue;
    }

    public String getRoleName() {
        return settingTitle;
    }

}
