package swp490.g23.onlinelearningsystem.entities.schedule.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;

public interface ScheduleRepositories extends JpaRepository<Schedule, Long> {

}
