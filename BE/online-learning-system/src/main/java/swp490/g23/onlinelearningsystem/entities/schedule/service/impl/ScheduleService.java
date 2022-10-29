package swp490.g23.onlinelearningsystem.entities.schedule.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.filter.ScheduleFilter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.request.ScheduleRequestDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ModuleTypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.SchedulePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ScheduleResponseDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.SettingTypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.repositories.ScheduleRepositories;
import swp490.g23.onlinelearningsystem.entities.schedule.repositories.criteria.ScheduleCriteria;
import swp490.g23.onlinelearningsystem.entities.schedule.repositories.criteria_entity.ScheduleQuery;
import swp490.g23.onlinelearningsystem.entities.schedule.service.IScheduleService;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ScheduleStatusEntity;

@Service
public class ScheduleService implements IScheduleService {

    @Autowired
    private ScheduleRepositories scheduleRepositories;

    @Autowired
    private ScheduleCriteria scheduleCriteria;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<SchedulePaginateDTO> displaySchedule(String keyword, int limit, int page,
            String filterStatus, String filterDate, String filterYear, Long userId) {

        User user = userRepository.findById(userId).get();
        ScheduleQuery result = scheduleCriteria.searchFilterSchedule(keyword, filterStatus, filterDate, filterYear,
                user);

        TypedQuery<Schedule> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<ScheduleResponseDTO> list = new ArrayList<>();
        List<ScheduleStatusEntity> statusfilter = new ArrayList<>();
        List<String> dateFilter = new ArrayList<>();
        List<String> yearFilter = new ArrayList<>();
        List<Schedule> scheduleList = queryResult.getResultList();

        for (ScheduleStatus status : new ArrayList<ScheduleStatus>(EnumSet.allOf(ScheduleStatus.class))) {
            statusfilter.add(new ScheduleStatusEntity(status));
        }

        for (Schedule schedule : scheduleList) {
            if (!dateFilter.contains(schedule.getTrainingDate().toString())) {
                dateFilter.add(schedule.getTrainingDate().toString());
            }
            if (!yearFilter.contains(Integer.toString(schedule.getTrainingDate().getYear()))) {
                yearFilter.add(Integer.toString(schedule.getTrainingDate().getYear()));
            }

        }

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        for (Schedule schedule : queryResult.getResultList()) {
            list.add(toDTO(schedule));
        }

        SchedulePaginateDTO dto = new SchedulePaginateDTO();
        dto.setPage(page);
        dto.setTotalItem(totalItem);
        dto.setListResult(list);
        dto.setTotalPage(totalPage);
        dto.setStatusFilter(statusfilter);
        dto.setDateFilter(dateFilter);
        dto.setYearFilter(yearFilter);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<ScheduleResponseDTO> scheduleDetail(Long id) {
        Schedule schedule = scheduleRepositories.findById(id)
                .orElseThrow(() -> new CustomException("Schedule doesnt exist"));
        return ResponseEntity.ok(toDTO(schedule));
    }

    @Override
    public ResponseEntity<ScheduleFilter> getFilter() {
        List<String> trainingDate = new ArrayList<>();
        List<String> yearList = new ArrayList<>();
        List<ScheduleStatusEntity> statuses = new ArrayList<>();
        List<Schedule> schedules = scheduleRepositories.findAll();

        for (Schedule schedule : schedules) {
            if (!trainingDate.contains(schedule.getTrainingDate().toString())) {
                trainingDate.add(schedule.getTrainingDate().toString());
            }
            if (!yearList.contains(Integer.toString(schedule.getTrainingDate().getYear()))) {
                yearList.add(Integer.toString(schedule.getTrainingDate().getYear()));
            }
        }

        for (ScheduleStatus status : new ArrayList<ScheduleStatus>(EnumSet.allOf(ScheduleStatus.class))) {
            statuses.add(new ScheduleStatusEntity(status));
        }

        ScheduleFilter filterDTO = new ScheduleFilter();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setDateFilter(trainingDate);
        filterDTO.setYearFilter(yearList);

        return ResponseEntity.ok(filterDTO);
    }

    @Override
    public ResponseEntity<String> addSchedule(ScheduleRequestDTO dto) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<String> updateSchedule(ScheduleRequestDTO dto, Long id) {
        Schedule schedule = scheduleRepositories.findById(id).get();
        Setting setting = settingRepositories.findBySettingValue(dto.getRoom());
        if (schedule == null) {
            throw new CustomException("schedule doesn't exist!");
        }
        if (dto.getStatus().equals("-1")) {
            throw new CustomException("schedule had taken attendence, can't change information!");
        }
        if (dto.getFromTime() != null) {
            schedule.setFromTime(LocalTime.parse(dto.getFromTime()));
        }
        if (dto.getToTime() != null) {
            schedule.setToTime(LocalTime.parse(dto.getToTime()));
        }
        if (dto.getDate() != null) {
            schedule.setTrainingDate(LocalDate.parse(dto.getDate()));
        }
        if (dto.getRoom() != null) {
            schedule.setSetting(setting);
        }
        return ResponseEntity.ok("Update Schedule successfully");
    }

    @Override
    public ResponseEntity<String> updateScheduleStatus(Long id) {
        Schedule schedule = scheduleRepositories.findById(id).get();
        if (schedule == null) {
            throw new CustomException("Trainee doesn't exist!");
        }
        if (schedule.getStatus() == ScheduleStatus.Active) {
            schedule.setStatus(ScheduleStatus.Inactive);
        } else {
            schedule.setStatus(ScheduleStatus.Active);
        }
        scheduleRepositories.save(schedule);
        return ResponseEntity.ok("Schedule status updated");
    }

    public ScheduleResponseDTO toDTO(Schedule entity) {
        ScheduleResponseDTO responseDTO = new ScheduleResponseDTO();

        responseDTO.setId(entity.getScheduleId());
        Classes clazz = entity.getClasses();

        if (clazz != null) {
            responseDTO.setClassCode(clazz.getCode());
        }
        if (entity.getClassSetting() != null) {
            responseDTO.setModules(new ModuleTypeResponseDTO(entity.getClassSetting().getSettingValue(),
                    entity.getClassSetting().getSettingTitle()));
        }
        if (entity.getSetting() != null) {
            responseDTO.setRoom(new SettingTypeResponseDTO(entity.getSetting().getSettingTitle(),
                    entity.getSetting().getSettingValue()));
        }
        if (entity.getFromTime() != null) {
            responseDTO.setFromTime(entity.getFromTime());
        }
        if (entity.getToTime() != null) {
            responseDTO.setToTime(entity.getToTime());
        }
        if (entity.getTrainingDate() != null) {
            responseDTO.setDate(entity.getTrainingDate());
        }
        responseDTO.setStatus(entity.getStatus());
        return responseDTO;
    }

}
