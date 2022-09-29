package swp490.g23.onlinelearningsystem.entities.permission.domain;

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
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;

@Entity
@Table(name = "permission")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SettingPermission {
    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private SettingPermissionId permissionId;

    @ManyToOne
    @MapsId("screenId")
    @JoinColumn(name = "screen_id")
    private Setting screen_id;

    @ManyToOne
    @MapsId("roleId")
    @JoinColumn(name = "role_id")
    private Setting role_id;

    @Column(name = "get_all_data")
    private boolean canGetAll;

    @Column
    private boolean canDelete;

    @Column
    private boolean canAdd;

    @Column
    private boolean canEdit;
}
