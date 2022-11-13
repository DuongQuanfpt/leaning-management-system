package swp490.g23.onlinelearningsystem.entities.attendance.service.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.attendance.domain.Attendance;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.AttendanceKey;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.request.AttendanceDetailRequestDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceDetailResponseDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceResponseDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.ScheduleAttendanceDTO;
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
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.AttendanceStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;

@Service
@Configuration
@EnableScheduling
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

    @Autowired
    private TaskScheduler scheduler;

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
            HashMap<String, AttendanceStatus> list = new HashMap<>();
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
                list.put(attendance.getSchedule().getClassSetting().getSettingValue(), attendance.getStatus());
                if (attendance.getStatus().equals(AttendanceStatus.Absent)) {
                    countAbsent++;
                }
            }
            Comparator<UserAttendanceResponseDTO> comparatorAsc = (att1, att2) -> att1.getDate()
                    .compareTo(att2.getDate());
            Collections.sort(userAttendances, comparatorAsc);
            for (Schedule schedule : schedules) {
                if (schedule.getStatus().equals(ScheduleStatus.Inactive)) {
                    userAttendances.add(new UserAttendanceResponseDTO(
                            schedule.getClassSetting().getSettingValue(),
                            schedule.getTrainingDate().toString()));
                }
            }
            attendanceResponseDTO.setSlotStatus(list);
            attendanceResponseDTO.setUserAttendance(userAttendances);
            attendanceResponseDTO.setAbsentPercent(new DecimalFormat("##.##").format((countAbsent / size) * 100));
            attendanceResponseDTO.setClassCode(clazz.getCode());
            attendanceResponseDTOs.add(attendanceResponseDTO);
        }
        return ResponseEntity.ok(attendanceResponseDTOs);
    }

    @Override
    public ResponseEntity<List<AttendanceDetailResponseDTO>> viewAttendance(Long id) {
        Schedule schedule = scheduleRepositories.findById(id).get();
        Classes clazz = schedule.getClasses();
        List<AttendanceDetailResponseDTO> dtos = new ArrayList<>();
        if (schedule.equals(null)) {
            throw new CustomException("Attendance doesn't exist!");
        }
        if (schedule.getStatus().equals(ScheduleStatus.Attendance_taken)) {
            throw new CustomException("This schedule had already taken attendance!");
        } else if (schedule.getStatus().equals(ScheduleStatus.Active)) {
            List<Attendance> attendances = schedule.getAttendances();
            for (Attendance attendance : attendances) {
                AttendanceDetailResponseDTO dto = new AttendanceDetailResponseDTO();
                dto.setAccountName(attendance.getClassUser().getUser().getAccountName());
                dto.setFullName(attendance.getClassUser().getUser().getFullName());
                dto.setClassCode(attendance.getClassUser().getClasses().getCode());
                dto.setStatus(attendance.getStatus());
                dto.setComment(attendance.getComment());
                dto.setImage(attendance.getClassUser().getUser().getAvatar_url());
                dtos.add(dto);
            }
        } else {
            List<ClassUser> classUsers = clazz.getClassUsers();
            for (ClassUser classUser : classUsers) {
                AttendanceDetailResponseDTO dto = new AttendanceDetailResponseDTO();
                dto.setAccountName(classUser.getUser().getAccountName());
                dto.setFullName(classUser.getUser().getFullName());
                dto.setClassCode(classUser.getClasses().getCode());
                dto.setImage(classUser.getUser().getAvatar_url());
                dtos.add(dto);
            }
        }
        return ResponseEntity.ok(dtos);
    }

    @Override
    public ResponseEntity<String> updateAttendance(List<AttendanceDetailRequestDTO> dtos, Long id) {
        Schedule schedule = scheduleRepositories.findById(id).get();
        // ScheduledExecutorService scheduler =
        // Executors.newSingleThreadScheduledExecutor();
        RunnableTask task = new RunnableTask(schedule);
        Classes clazz = schedule.getClasses();
        if (schedule.equals(null)) {
            throw new CustomException("Attendance doesn't exist!");
        }
        if (schedule.getStatus().equals(ScheduleStatus.Attendance_taken)) {
            throw new CustomException("This schedule had already taken attendance! Can not edit");
        } else if (schedule.getStatus().equals(ScheduleStatus.Active)) {
            List<Attendance> attendances = schedule.getAttendances();
            List<Attendance> requestList = new ArrayList<>();
            for (Attendance attendance : attendances) {
                for (AttendanceDetailRequestDTO dto : dtos) {
                    if (dto.getAccountName().equals(attendance.getClassUser().getUser().getAccountName())) {
                        if (dto.getComment() != null) {
                            attendance.setComment(dto.getComment());
                        }
                        if (dto.getStatus() != null) {
                            attendance.setStatus(AttendanceStatus.fromInt(Integer.parseInt(dto.getStatus())));
                        }
                        requestList.add(attendance);
                    }
                }
            }
            attendanceRepositories.saveAll(requestList);
        } else {
            List<Attendance> attendances = new ArrayList<>();
            List<ClassUser> classUsers = clazz.getClassUsers();
            for (ClassUser classUser : classUsers) {
                Attendance attendance = new Attendance();
                for (AttendanceDetailRequestDTO dto : dtos) {
                    if (dto.getAccountName().equals(classUser.getUser().getAccountName())) {
                        attendance.setClassUser(classUser);
                        attendance.setSchedule(schedule);
                        AttendanceKey key = new AttendanceKey();
                        key.setClassId(clazz.getClassId());
                        key.setUserId(classUser.getUser().getUserId());
                        key.setScheduleId(schedule.getScheduleId());
                        attendance.setId(key);
                        if (dto.getStatus() != null) {
                            attendance.setStatus(AttendanceStatus.fromInt(Integer.parseInt(dto.getStatus())));
                        } else {
                            throw new CustomException("Must add status!");
                        }
                        if (dto.getComment() != null) {
                            attendance.setComment(dto.getComment());
                        }
                        schedule.setStatus(ScheduleStatus.Active);
                        scheduler.scheduleWithFixedDelay(task, 100000);
                        attendances.add(attendance);
                    }
                }
            }
            attendanceRepositories.saveAll(attendances);
        }
        return ResponseEntity.ok("update successfully!");
    }

    @Override
    public ResponseEntity<List<ScheduleAttendanceDTO>> scheduleAttendance(Long id, String clasCode) {
        User user = userRepository.findById(id).get();
        Classes clazz = classRepositories.findClassByCode(clasCode);
        List<ScheduleAttendanceDTO> list = new ArrayList<>();
        List<Schedule> schedules = scheduleRepositories.findByClasses(clazz);
        for (Schedule schedule : schedules) {
            ScheduleAttendanceDTO dto = new ScheduleAttendanceDTO();
            Attendance attendance = attendanceRepositories.findByScheduleAndUser(user, schedule);
            dto.setSlot(schedule.getClassSetting().getSettingValue());
            dto.setTopic(schedule.getTopic());
            dto.setDate(schedule.getTrainingDate());
            dto.setFromTime(schedule.getFromTime());
            dto.setToTime(schedule.getToTime());
            dto.setRoom(schedule.getSetting().getSettingTitle());
            dto.setScheduleStatus(schedule.getStatus());
            if (attendance != null) {
                dto.setAttendanceStatus(attendance.getStatus());
            }
            list.add(dto);
        }
        return ResponseEntity.ok(list);
    }

    public void changeStatus(Schedule schedule) {
        if (schedule.getStatus().equals(ScheduleStatus.Active)) {
            schedule.setStatus(ScheduleStatus.Attendance_taken);
        }
    }
}
