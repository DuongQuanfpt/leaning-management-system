package swp490.g23.onlinelearningsystem.entities.attendance.repositories.criteriaEntity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.Attendance;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceQuery {
    TypedQuery<Attendance> resultQuery;
    TypedQuery<Long> countQuery;
}
