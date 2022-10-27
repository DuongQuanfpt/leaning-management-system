package swp490.g23.onlinelearningsystem.entities.schedule.repositories.criteria_entity;

import javax.persistence.TypedQuery;

import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;

public class ScheduleQuery {
    TypedQuery<Schedule> resultQuery;
    TypedQuery<Long> countQuery;
}
