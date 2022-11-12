package swp490.g23.onlinelearningsystem.entities.attendance.domain;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.BaseEntity;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.util.enumutil.AttendanceStatus;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attendance extends BaseEntity {
    @EmbeddedId
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private AttendanceKey id = new AttendanceKey();

    private AttendanceStatus status;

    private String comment;

    @ManyToOne
    @MapsId("scheduleId")
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumns({
            @JoinColumn(name = "class_id", referencedColumnName = "class_id", insertable = false, updatable = false),
            @JoinColumn(name = "trainee_Id", referencedColumnName = "user_Id", insertable = false, updatable = false)
    })
    private ClassUser classUser;
}
