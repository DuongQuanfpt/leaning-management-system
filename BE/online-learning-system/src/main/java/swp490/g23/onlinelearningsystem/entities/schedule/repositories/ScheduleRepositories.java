package swp490.g23.onlinelearningsystem.entities.schedule.repositories;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface ScheduleRepositories extends JpaRepository<Schedule, Long> {

    List<Schedule> findByClasses(Classes classes);

    @Query(value = "SELECT s FROM Schedule s JOIN s.classes as c WHERE s.trainingDate = :today AND c.userTrainer = :user")
    List<Schedule> findByToday(User user, LocalDate today);

    @Query(value = "SELECT s FROM Schedule s WHERE s.trainingDate BETWEEN :threeDaysAgo AND :today")
    List<Schedule> findByThreeDaysAgo(LocalDate threeDaysAgo, LocalDate today);

}
