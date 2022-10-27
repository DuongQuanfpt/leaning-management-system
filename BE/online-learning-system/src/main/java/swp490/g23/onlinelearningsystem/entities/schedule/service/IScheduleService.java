package swp490.g23.onlinelearningsystem.entities.schedule.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.schedule.domain.filter.ScheduleFilter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.request.ScheduleRequestDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.SchedulePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ScheduleResponseDTO;

public interface IScheduleService {

    ResponseEntity<SchedulePaginateDTO> displaySchedule(String keyword, int limit, int page, String filterStatus);

    ResponseEntity<ScheduleResponseDTO> scheduleDetail(Long id);

    ResponseEntity<ScheduleFilter> getFilter();

    ResponseEntity<String> addSchedule(ScheduleRequestDTO dto);

    ResponseEntity<String> updateSchedule(ScheduleRequestDTO dto, Long id);

    ResponseEntity<String> updateScheduleStatus(Long id);
}