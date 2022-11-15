package swp490.g23.onlinelearningsystem.entities.schedule.service;

import org.springframework.http.ResponseEntity;

import swp490.g23.onlinelearningsystem.entities.schedule.domain.filter.ScheduleFilter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.request.ScheduleRequestDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.MyClassesDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.SchedulePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ScheduleResponseDTO;

public interface IScheduleService {

    ResponseEntity<SchedulePaginateDTO> displaySchedule(String keyword, int limit, int page, String filterStatus,
            String filterDate, String filterYear, String filterClass, Long userId);

    ResponseEntity<ScheduleResponseDTO> scheduleDetail(Long id);

    ResponseEntity<ScheduleFilter> getFilter(Long id);

    ResponseEntity<String> addSchedule(ScheduleRequestDTO dto, Long id);

    ResponseEntity<String> updateSchedule(ScheduleRequestDTO dto, Long id);

    ResponseEntity<String> updateScheduleStatus(Long id);

    ResponseEntity<MyClassesDTO> myClassesSchedule(Long id);
}
