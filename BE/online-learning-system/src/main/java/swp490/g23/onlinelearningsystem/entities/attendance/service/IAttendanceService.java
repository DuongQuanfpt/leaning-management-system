package swp490.g23.onlinelearningsystem.entities.attendance.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.attendance.domain.request.AttendanceDetailRequestDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceDetailResponseDTO;
import swp490.g23.onlinelearningsystem.entities.attendance.domain.response.AttendanceResponseDTO;

public interface IAttendanceService {
    ResponseEntity<List<AttendanceResponseDTO>> displayAttendanceList(String classCode, Long userId);

    ResponseEntity<List<AttendanceDetailResponseDTO>> viewAttendance(Long id);

    ResponseEntity<String> updateAttendance(List<AttendanceDetailRequestDTO> dtos, Long id);
}
