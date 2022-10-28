package swp490.g23.onlinelearningsystem.entities.schedule.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.ClassSettingRepository;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.filter.ScheduleFilter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.request.ScheduleRequestDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.SchedulePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ScheduleResponseDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.repositories.ScheduleRepositories;
import swp490.g23.onlinelearningsystem.entities.schedule.service.IScheduleService;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.ScheduleStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.ScheduleStatusEntity;

@Service
public class ScheduleService implements IScheduleService {

    @Autowired
    private ScheduleRepositories scheduleRepositories;

    @Autowired
    private ClassSettingRepository classSettingRepository;

    @Override
    public ResponseEntity<SchedulePaginateDTO> displaySchedule(String keyword, int limit, int page,
            String filterStatus) {
        // TODO Auto-generated method stub
        return null;
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
        List<ScheduleStatusEntity> statuses = new ArrayList<>();
        List<Schedule> schedules = scheduleRepositories.findAll();

        for (Schedule schedule : schedules) {
            trainingDate.add(schedule.getTrainingDate().toString());
        }

        for (ScheduleStatus status : new ArrayList<ScheduleStatus>(EnumSet.allOf(ScheduleStatus.class))) {
            statuses.add(new ScheduleStatusEntity(status));
        }

        ScheduleFilter filterDTO = new ScheduleFilter();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setDateFilter(trainingDate);

        return ResponseEntity.ok(filterDTO);
    }

    @Override
    public ResponseEntity<String> addSchedule(ScheduleRequestDTO dto) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<String> updateSchedule(ScheduleRequestDTO dto, Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ResponseEntity<String> updateScheduleStatus(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    public ScheduleResponseDTO toDTO(Schedule entity) {
        ScheduleResponseDTO responseDTO = new ScheduleResponseDTO();

        responseDTO.setId(entity.getScheduleId());
        Classes clazz = entity.getClasses();
        List<ClassSetting> classSettings = classSettingRepository.findByClassAndSlot(clazz);

        List<String> slots = new ArrayList<>();
        List<String> topics = new ArrayList<>();

        if (clazz != null) {
            responseDTO.setClassCode(clazz.getCode());
        }
        if (classSettings != null) {
            for (ClassSetting classSetting : classSettings) {
                slots.add(classSetting.getSettingValue());
                topics.add(classSetting.getSettingTitle());
            }
        }
        if (entity.getFromTime() != null) {
            responseDTO.getFromTime();
        }
        if (entity.getToTime() != null) {
            responseDTO.getToTime();
        }
        if (entity.getTrainingDate() != null) {
            responseDTO.getDate();
        }
        responseDTO.setStatus(entity.getStatus());
        return responseDTO;
    }

}
