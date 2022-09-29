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
    Long screen_id;

    @Column(name = "role_id")
    Long role_id;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((role_id == null) ? 0 : role_id.hashCode());
        result = prime * result + ((screen_id == null) ? 0 : screen_id.hashCode());
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
        if (role_id == null) {
            if (other.role_id != null)
                return false;
        } else if (!role_id.equals(other.role_id))
            return false;
        if (screen_id == null) {
            if (other.screen_id != null)
                return false;
        } else if (!screen_id.equals(other.screen_id))
            return false;
        return true;
    }

    
    
}
