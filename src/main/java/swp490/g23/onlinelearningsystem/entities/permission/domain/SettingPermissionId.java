package swp490.g23.onlinelearningsystem.entities.permission.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class SettingPermissionId implements Serializable {
    @Column(name = "screen_id")
    Long screenId;

    @Column(name = "role_id")
    Long roleId;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((roleId == null) ? 0 : roleId.hashCode());
        result = prime * result + ((screenId == null) ? 0 : screenId.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        SettingPermissionId other = (SettingPermissionId) obj;
        if (roleId == null) {
            if (other.roleId != null)
                return false;
        } else if (!roleId.equals(other.roleId))
            return false;
        if (screenId == null) {
            if (other.screenId != null)
                return false;
        } else if (!screenId.equals(other.screenId))
            return false;
        return true;
    }

    
}
