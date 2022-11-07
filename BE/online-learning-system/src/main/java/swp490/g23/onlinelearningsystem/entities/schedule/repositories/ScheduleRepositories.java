package swp490.g23.onlinelearningsystem.entities.schedule.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;

public interface ScheduleRepositories extends JpaRepository<Schedule, Long> {

    List<Schedule> findByClasses(Classes classes);
}
