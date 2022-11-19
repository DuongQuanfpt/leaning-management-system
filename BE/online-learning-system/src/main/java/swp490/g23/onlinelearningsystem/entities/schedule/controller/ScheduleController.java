package swp490.g23.onlinelearningsystem.entities.schedule.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import swp490.g23.onlinelearningsystem.entities.schedule.domain.filter.ScheduleFilter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.request.ScheduleRequestDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.MyClassesDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.SchedulePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ScheduleResponseDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.service.impl.ScheduleService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;

@RestController
@RequestMapping(Setting.API_PREFIX)
@CrossOrigin
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping(value = "/schedule")
    public ResponseEntity<SchedulePaginateDTO> displayMilestone(
            @RequestParam(name = "page", required = false) String currentPage,
            @RequestParam(name = "limit", required = false) String requestLimit,
            @RequestParam(name = "q", required = false) String keyword,
            @RequestParam(name = "filterStatus", required = false) Long statusValue,
            @RequestParam(name = "filterDateFrom", required = false) String dateFromFilter,
            @RequestParam(name = "filterDateTo", required = false) String dateToFilter,
            @RequestParam(name = "filterClass", required = false) String classFilter,
            @AuthenticationPrincipal User user) {

        int page = (currentPage == null) ? 1 : Integer.parseInt(currentPage);
        int limit = (requestLimit == null) ? 0 : Integer.parseInt(requestLimit);
        return scheduleService.displaySchedule(keyword, limit, page,
                statusValue,
                dateFromFilter, dateToFilter, classFilter, user.getUserId());
    }

    @GetMapping(value = "/schedule-detail/{id}")
    public ResponseEntity<ScheduleResponseDTO> scheduleDetail(@PathVariable Long id) {

        return scheduleService.scheduleDetail(id);
    }

    @PutMapping(value = "/schedule-detail/{id}")
    public ResponseEntity<String> updateSchedule(@RequestBody ScheduleRequestDTO dto,
            @PathVariable Long id) {

        return scheduleService.updateSchedule(dto, id);
    }

    @PostMapping(value = "/schedule-add")
    public ResponseEntity<String> addSchedule(@RequestBody ScheduleRequestDTO dto, @AuthenticationPrincipal User user) {

        return scheduleService.addSchedule(dto, user.getUserId());
    }

    @GetMapping(value = "/schedule-filter")
    public ResponseEntity<ScheduleFilter> scheduleFilter(@AuthenticationPrincipal User user) {

        return scheduleService.getFilter(user.getUserId());
    }

    @GetMapping(value = "/my-schedule")
    public ResponseEntity<MyClassesDTO> mySchedule(@AuthenticationPrincipal User user) {
        return scheduleService.myClassesSchedule(user.getUserId());
    }
}
