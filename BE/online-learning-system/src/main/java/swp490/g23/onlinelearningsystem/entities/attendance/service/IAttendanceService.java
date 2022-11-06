package swp490.g23.onlinelearningsystem.entities.attendance.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceResponseDTO;

public interface IAttendanceService {
    ResponseEntity<List<AttendanceResponseDTO>> displayAttendanceList(String classCode, Long userId);
}
