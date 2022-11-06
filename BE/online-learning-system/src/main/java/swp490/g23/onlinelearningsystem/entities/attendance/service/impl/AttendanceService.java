package swp490.g23.onlinelearningsystem.entities.attendance.service.impl;

import java.text.DecimalFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.attendance.domain.Attendance;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceResponseDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.UserAttendanceResponseDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.repositories.AttendanceRepositories;
import swp490.g23.onlinelearningsystem.entities.attendance.repositories.criteria.AttendanceCriteria;
import swp490.g23.onlinelearningsystem.entities.attendance.service.IAttendanceService;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.schedule.repositories.ScheduleRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.enumutil.AttendanceStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;

@Service
public class AttendanceService implements IAttendanceService {

    @Autowired
    private AttendanceRepositories attendanceRepositories;

    @Autowired
    private ClassUserRepositories classUserRepositories;

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private ScheduleRepositories scheduleRepositories;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttendanceCriteria attendanceCriteria;

    @Override
    public ResponseEntity<List<AttendanceResponseDTO>> displayAttendanceList(String classCode, Long userId) {
        User user = userRepository.findById(userId).get();
        Classes clazz = classRepositories.findClassByCode(classCode);
        TypedQuery<ClassUser> queryResult = attendanceCriteria.getListAttendance(classCode, user);

        List<ClassUser> classUsers = queryResult.getResultList();
        List<AttendanceResponseDTO> attendanceResponseDTOs = new ArrayList<>();
        List<Schedule> schedules = scheduleRepositories.findByClasses(clazz);
        double size = schedules.size();

        for (ClassUser classUser : classUsers) {
            AttendanceResponseDTO attendanceResponseDTO = new AttendanceResponseDTO();
            double countAbsent = 0;
            attendanceResponseDTO.setAccountName(classUser.getUser().getAccountName());
            attendanceResponseDTO.setFullName(classUser.getUser().getFullName());
            List<Attendance> attendances = classUser.getAttendances();
            List<UserAttendanceResponseDTO> userAttendances = new ArrayList<>();
            for (Attendance attendance : attendances) {
                userAttendances.add(new UserAttendanceResponseDTO(
                        attendance.getSchedule().getClassSetting().getSettingValue(),
                        attendance.getSchedule().getTrainingDate().toString(), attendance.getStatus(),
                        attendance.getComment()));
                if (attendance.getStatus().equals(AttendanceStatus.Absent)) {
                    countAbsent++;
                }
            }
            for (Schedule schedule : schedules) {
                if (schedule.getStatus().equals(ScheduleStatus.Inactive)) {
                    userAttendances.add(new UserAttendanceResponseDTO(
                            schedule.getClassSetting().getSettingValue(),
                            schedule.getTrainingDate().toString()));
                }
            }
            attendanceResponseDTO.setUserAttendance(userAttendances);
            attendanceResponseDTO.setAbsentPercent(new DecimalFormat("##.##").format((countAbsent / size) * 100));
            attendanceResponseDTOs.add(attendanceResponseDTO);
        }
        return ResponseEntity.ok(attendanceResponseDTOs);
    }

    public AttendanceResponseDTO toDTO(Attendance entity) {
        AttendanceResponseDTO responseDTO = new AttendanceResponseDTO();

        // if (entity.getComment() != null) {
        // responseDTO.setComment(entity.getComment());
        // }
        if (entity.getClassUser().getUser() != null) {
            responseDTO.setAccountName(entity.getClassUser().getUser().getAccountName());
            responseDTO.setFullName(entity.getClassUser().getUser().getFullName());
        }
        // if (entity.getClassUser() != null && entity.getSchedule() != null) {
        // responseDTO.setUserAttendance(new UserAttendanceResponseDTO(
        // entity.getSchedule().getClassSetting().getSettingValue(),
        // entity.getSchedule().getTrainingDate().toString(),
        // entity.getStatus()));
        // responseDTO.setClassCode(entity.getClassUser().getClasses().getCode());
        // }
        responseDTO.setClassCode(entity.getClassUser().getClasses().getCode());
        return responseDTO;
    }
}
