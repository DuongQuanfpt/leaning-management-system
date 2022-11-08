package swp490.g23.onlinelearningsystem.entities.attendance.domain.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendanceDetailWrapper {
    List<AttendanceDetailRequestDTO> dto;
}
