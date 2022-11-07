package swp490.g23.onlinelearningsystem.entities.attendance.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceKey implements Serializable {

    @Column(name = "class_id", insertable = false, updatable = false)
    private Long classId;

    @Column(name = "trainee_id", insertable = false, updatable = false)
    private Long userId;

    @Column(name = "schedule_id")
    private Long scheduleId;

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((classId == null) ? 0 : classId.hashCode());
        result = prime * result + ((userId == null) ? 0 : userId.hashCode());
        result = prime * result + ((scheduleId == null) ? 0 : scheduleId.hashCode());
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
        AttendanceKey other = (AttendanceKey) obj;
        if (classId == null) {
            if (other.classId != null)
                return false;
        } else if (!classId.equals(other.classId))
            return false;
        if (userId == null) {
            if (other.userId != null)
                return false;
        } else if (!userId.equals(other.userId))
            return false;
        if (scheduleId == null) {
            if (other.scheduleId != null)
                return false;
        } else if (!scheduleId.equals(other.scheduleId))
            return false;
        return true;
    }

}
