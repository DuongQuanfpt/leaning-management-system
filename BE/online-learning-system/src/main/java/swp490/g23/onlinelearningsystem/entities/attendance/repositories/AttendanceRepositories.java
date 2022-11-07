package swp490.g23.onlinelearningsystem.entities.attendance.repositories;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import swp490.g23.onlinelearningsystem.entities.attendance.domain.Attendance;

public interface AttendanceRepositories extends JpaRepository<Attendance, Long> {

    @Query(value = "SELECT a FROM Attendance a JOIN a.classUser as c JOIN a.schedule as s WHERE c.user.accountName = :accountName AND s.trainingDate = :trainingDate AND s.classSetting.settingValue = :slot")
    Attendance findAttendanceByAccountNameAndDateAndSlot(String accountName, LocalDate trainingDate, String slot);
}
