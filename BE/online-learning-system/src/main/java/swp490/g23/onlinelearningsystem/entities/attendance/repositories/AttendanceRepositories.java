package swp490.g23.onlinelearningsystem.entities.attendance.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.attendance.domain.Attendance;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

public interface AttendanceRepositories extends JpaRepository<Attendance, Long> {

    @Query(value = "SELECT a FROM Attendance a JOIN a.classUser as c JOIN a.schedule as s WHERE c.user = :user AND s = :schedule")
    Attendance findByScheduleAndUser(User user, Schedule schedule);
}
