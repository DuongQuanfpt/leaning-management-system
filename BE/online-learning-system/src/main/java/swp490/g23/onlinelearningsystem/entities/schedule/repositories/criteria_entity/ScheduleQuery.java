package swp490.g23.onlinelearningsystem.entities.schedule.repositories.criteria_entity;

import javax.persistence.TypedQuery;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleQuery {
    TypedQuery<Schedule> resultQuery;
    TypedQuery<Long> countQuery;
}
