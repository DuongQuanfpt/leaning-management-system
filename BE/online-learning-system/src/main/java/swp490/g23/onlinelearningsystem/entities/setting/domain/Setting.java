package swp490.g23.onlinelearningsystem.entities.setting.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.util.EnumEntity.RoleStatusEnum;;


@Entity
@Table(name = "setting")
@Getter
@Setter
@NoArgsConstructor
public class Setting extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long settingId;

    @Column
    private String settingTitle;

    @Column(name = "setting_value", unique = true)
    private String settingValue;

    @Column
    @Enumerated(EnumType.STRING)
    private RoleStatusEnum status;

    @Column
    private String description;

    @Column
    private String displayOrder;

    @ManyToOne
    @JoinColumn(name = "type_id")
    private Setting type;

    @OneToMany(mappedBy = "type")
    private List<Setting> settings = new ArrayList<>();

    @ManyToMany(mappedBy = "settings")
    private List<User> users = new ArrayList<>();

    public Setting(String settingTitle, String settingValue, String description) {
        this.settingTitle = settingTitle;
        this.settingValue = settingValue;
        this.description = description;
    }

   
    public Setting(String settingTitle, String settingValue, String description, Setting type) {
        this.settingTitle = settingTitle;
        this.settingValue = settingValue;
        this.description = description;
        this.type = type;
        this.status=RoleStatusEnum.ACTIVE;
    }


    @Override
    public String toString() {
        return settingValue;
    }

    public String getRoleName() {
        return settingTitle;
    }

}