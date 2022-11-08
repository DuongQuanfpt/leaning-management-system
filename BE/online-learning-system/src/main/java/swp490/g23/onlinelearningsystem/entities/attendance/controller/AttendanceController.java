package swp490.g23.onlinelearningsystem.entities.attendance.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.attendance.domain.request.AttendanceDetailRequestDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.request.AttendanceDetailWrapper;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.request.AttendanceRequestDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceDetailResponseDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceResponseDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.ScheduleAttendanceDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.service.impl.AttendanceService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/attendance-tracking")
    public ResponseEntity<List<AttendanceResponseDTO>> getAttendance(
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "filterClass", required = true) String classFilter,
            @AuthenticationPrincipal User user) {

        return attendanceService.displayAttendanceList(classFilter, user.getUserId());
    }

    @GetMapping("/attendance-detail/{id}")
    public ResponseEntity<List<AttendanceDetailResponseDTO>> viewAttendance(@PathVariable("id") Long id) {
        return attendanceService.viewAttendance(id);
    }

    @PutMapping("/attendance-detail/{id}")
    public ResponseEntity<String> updateAttendance(@RequestBody AttendanceDetailWrapper wrapper,
            @PathVariable("id") Long id) {

        List<AttendanceDetailRequestDTO> list = wrapper.getDto();
        return attendanceService.updateAttendance(list, id);
    }

    @GetMapping("/attendance-schedule")
    public ResponseEntity<List<ScheduleAttendanceDTO>> scheduleAttendance(
            @RequestParam(name = "filterClass", required = true) String classCode, @AuthenticationPrincipal User user) {
        return attendanceService.scheduleAttendance(user.getUserId(), classCode);
    }
}
