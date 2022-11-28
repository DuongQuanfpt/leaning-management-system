package swp490.g23.onlinelearningsystem.entities.schedule.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.ClassSettingRepository;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.Schedule;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.filter.ScheduleFilter;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.request.ScheduleRequestDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.ModuleTypeResponseDTO;
import swp490.g23.onlinelearningsystem.entities.schedule.domain.response.MyClassesDTO;
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
import swp490.g23.onlinelearningsystem.enums.ScheduleStatus;
import swp490.g23.onlinelearningsystem.enums.Status;
import swp490.g23.onlinelearningsystem.enums.enumentities.ScheduleStatusEntity;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

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

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private ClassSettingRepository classSettingRepository;

    @Override
    public ResponseEntity<SchedulePaginateDTO> displaySchedule(String keyword, int limit, int page,
            Long statusValue, String filterDateFrom, String filterDateTo, String filterClass, Long userId) {

        User user = userRepository.findById(userId).get();
        ScheduleQuery result = scheduleCriteria.searchFilterSchedule(keyword,
                statusValue,
                filterDateFrom, filterDateTo, filterClass, user);

        TypedQuery<Schedule> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<ScheduleResponseDTO> list = new ArrayList<>();
        List<ScheduleStatusEntity> statusfilter = new ArrayList<>();
        List<String> dateFilter = new ArrayList<>();
        List<String> yearFilter = new ArrayList<>();
        List<String> classList = new ArrayList<>();
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
            if (!classList.contains(schedule.getClasses().getCode())) {
                classList.add(schedule.getClasses().getCode());
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
        dto.setClassList(classList);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<ScheduleResponseDTO> scheduleDetail(Long id) {
        Schedule schedule = scheduleRepositories.findById(id)
                .orElseThrow(() -> new CustomException("Schedule doesnt exist"));
        return ResponseEntity.ok(toDTO(schedule));
    }

    @Override
    public ResponseEntity<ScheduleFilter> getFilter(Long id) {
        User user = userRepository.findById(id).get();
        List<String> trainingDate = new ArrayList<>();
        List<String> yearList = new ArrayList<>();
        List<Classes> classList = classRepositories.findClassSupporterAssigned(user.getAccountName());
        List<SettingTypeResponseDTO> roomList = new ArrayList<>();
        List<ScheduleStatusEntity> statuses = new ArrayList<>();
        List<ModuleTypeResponseDTO> slotFilter = new ArrayList<>();
        List<Schedule> schedules = scheduleRepositories.findAll();
        List<Setting> rooms = settingRepositories.findAllRoom();

        for (Schedule schedule : schedules) {
            if (!trainingDate.contains(schedule.getTrainingDate().toString())) {
                trainingDate.add(schedule.getTrainingDate().toString());
            }
            if (!yearList.contains(Integer.toString(schedule.getTrainingDate().getYear()))) {
                yearList.add(Integer.toString(schedule.getTrainingDate().getYear()));
            }
        }

        for (Classes clazz : classList) {
            for (ClassSetting classSetting : classSettingRepository.findByClassAndSlot(clazz.getCode())) {
                slotFilter
                        .add(new ModuleTypeResponseDTO(classSetting.getSettingValue(), classSetting.getSettingTitle(),
                                classSetting.getClasses().getCode()));
            }
        }

        for (ScheduleStatus status : new ArrayList<ScheduleStatus>(EnumSet.allOf(ScheduleStatus.class))) {
            statuses.add(new ScheduleStatusEntity(status));
        }

        for (Setting room : rooms) {
            roomList.add(new SettingTypeResponseDTO(room.getSettingTitle(), room.getSettingValue()));
        }

        ScheduleFilter filterDTO = new ScheduleFilter();
        filterDTO.setStatusFilter(statuses);
        filterDTO.setDateFilter(trainingDate);
        filterDTO.setYearFilter(yearList);
        filterDTO.setRoomFilter(roomList);
        filterDTO.setSlotFilter(slotFilter);

        return ResponseEntity.ok(filterDTO);
    }

    @Override
    public ResponseEntity<String> addSchedule(ScheduleRequestDTO dto, Long id) {
        Schedule schedule = new Schedule();
        ClassSetting settingClass = new ClassSetting();
        Classes clazz = classRepositories.findClassByCode(dto.getClazz());
        Setting setting = settingRepositories.findBySettingValue(dto.getRoom());
        LocalDate dateNow = LocalDate.now();
        LocalTime timeNow = LocalTime.now();
        LocalDate requestDate = LocalDate.parse(dto.getDate());
        LocalTime requestFromTime = LocalTime.parse(dto.getFromTime());
        LocalTime requestToTime = LocalTime.parse(dto.getToTime());

        List<ClassSetting> listClassSetting = classSettingRepository.findByClassAndSlot(clazz.getCode());
        List<String> listSlot = new ArrayList<>();
        List<Schedule> scheduleList = new ArrayList<>();
        for (ClassSetting clazzSetting : listClassSetting) {
            listSlot.add(clazzSetting.getSettingValue().toLowerCase());
            scheduleList.addAll(clazzSetting.getSchedules());
        }
        if (listSlot.contains(dto.getSlot().toLowerCase())) {
            throw new CustomException("Class had this slot already! Try again!");
        } else {
            for (Schedule schedu : scheduleList) {
                if (requestDate.equals(schedu.getTrainingDate())
                        && requestFromTime.equals(schedu.getFromTime())
                        && requestToTime.equals(schedu.getToTime())) {
                    throw new CustomException("This time had already asigned by one slot! Try again!");
                }
            }
            settingClass.setSettingValue(dto.getSlot());
            settingClass.setClasses(clazz);
            settingClass.setStatus(Status.Active);
            settingClass.setType(settingRepositories.findBySettingValue("TYPE_CLASS_MODULE"));
            classSettingRepository.save(settingClass);
            schedule.setClassSetting(settingClass);
            schedule.setClasses(clazz);
        }

        if (dto.getRoom() != null && setting != null) {
            if (setting.getSchedules() != null) {
                for (Schedule sche : setting.getSchedules()) {
                    if (requestDate.equals(sche.getTrainingDate())
                            && requestFromTime.equals(sche.getFromTime())
                            && requestToTime.equals(sche.getToTime())) {
                        throw new CustomException("Room already have slots, cannot assign!");
                    }
                }
            }
            schedule.setSetting(setting);
        }
        if (dto.getDate() != null) {
            if (requestDate.isBefore(dateNow)) {
                throw new CustomException("Date is before now, ilegal to udpate!");
            } else if (requestDate.equals(dateNow)
                    && (requestFromTime.isBefore(timeNow) || requestToTime.isBefore(timeNow))) {
                throw new CustomException("Time is before now, ilegal to udpate!");
            } else {
                if (requestFromTime.isAfter(requestToTime)) {
                    throw new CustomException("From Time must before To Time");
                } else {
                    schedule.setTrainingDate(LocalDate.parse(dto.getDate()));
                    schedule.setFromTime(LocalTime.parse(dto.getFromTime()));
                    schedule.setToTime(LocalTime.parse(dto.getToTime()));
                }
            }
        }
        if (dto.getTopic() != null) {
            schedule.setTopic(dto.getTopic());
        }
        schedule.setStatus(ScheduleStatus.Inactive);
        scheduleRepositories.save(schedule);
        return ResponseEntity.ok("Schedule add successfully!");
    }

    @Override
    public ResponseEntity<String> updateSchedule(ScheduleRequestDTO dto, Long id) {
        Schedule schedule = scheduleRepositories.findById(id).get();
        if (schedule == null) {
            throw new CustomException("schedule doesn't exist!");
        }
        Setting setting = settingRepositories.findBySettingValue(dto.getRoom());
        String slot = dto.getSlot();
        LocalDate dateNow = LocalDate.now();
        LocalTime timeNow = LocalTime.now();
        LocalDate requestDate = LocalDate.parse(dto.getDate());
        LocalTime requestFromTime = LocalTime.parse(dto.getFromTime());
        LocalTime requestToTime = LocalTime.parse(dto.getToTime());

        if (schedule.getStatus().equals(null) || schedule.getStatus().equals(ScheduleStatus.Active)) {
            throw new CustomException("schedule had taken attendence, can't change information!");
        }
        if (dto.getRoom() != null && setting != null) {
            if (setting.getSchedules() != null) {
                for (Schedule sche : setting.getSchedules()) {
                    if (slot.equalsIgnoreCase(sche.getClassSetting().getSettingValue())) {
                        if (dto.getTopic() != null) {
                            schedule.setTopic(dto.getTopic());
                            if (dto.getDate() != null) {
                                if (requestDate.equals(sche.getTrainingDate())
                                        && requestFromTime.equals(sche.getFromTime())
                                        && requestToTime.equals(sche.getToTime())) {
                                    if (dto.getRoom().equals(sche.getSetting().getSettingValue())) {
                                        continue;
                                    } else {
                                        throw new CustomException("Room already have slots, cannot assign!");
                                    }
                                }
                                if (!requestDate.equals(sche.getTrainingDate())
                                        || !requestFromTime.equals(sche.getFromTime())
                                        || !requestToTime.equals(sche.getToTime())) {
                                    if (requestDate.isBefore(dateNow)) {
                                        throw new CustomException("Date is before now, ilegal to udpate!");
                                    } else if (requestDate.equals(dateNow)
                                            && (requestFromTime.isBefore(timeNow)
                                                    || requestToTime.isBefore(timeNow))) {
                                        throw new CustomException("Time is before now, ilegal to udpate!");
                                    } else {
                                        if (requestFromTime.isAfter(requestToTime)) {
                                            throw new CustomException("From Time must before To Time");
                                        } else {
                                            schedule.setTrainingDate(LocalDate.parse(dto.getDate()));
                                            schedule.setFromTime(LocalTime.parse(dto.getFromTime()));
                                            schedule.setToTime(LocalTime.parse(dto.getToTime()));
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            schedule.setSetting(setting);
        }
        scheduleRepositories.save(schedule);
        return ResponseEntity.ok("Update Schedule successfully");
    }

    @Override
    public ResponseEntity<String> updateScheduleStatus(Long id) {
        Schedule schedule = scheduleRepositories.findById(id).get();
        if (schedule == null) {
            throw new CustomException("Schedule doesn't exist!");
        }
        if (schedule.getStatus() == ScheduleStatus.Active) {
            schedule.setStatus(ScheduleStatus.Inactive);
        } else {
            schedule.setStatus(ScheduleStatus.Active);
        }
        scheduleRepositories.save(schedule);
        return ResponseEntity.ok("Schedule status updated");
    }

    @Override
    public ResponseEntity<MyClassesDTO> myClassesSchedule(Long id) {
        User user = userRepository.findById(id).get();
        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);
        LocalDate threeDaysAgo = today.minusDays(3);
        List<Schedule> todayList = scheduleRepositories.findByToday(user, today);
        List<Schedule> threeDaysAgoList = scheduleRepositories.findByThreeDaysAgo(threeDaysAgo, yesterday);
        MyClassesDTO dto = new MyClassesDTO();
        List<ScheduleResponseDTO> list1 = new ArrayList<>();
        List<ScheduleResponseDTO> list2 = new ArrayList<>();
        for (Schedule schedule : todayList) {
            ScheduleResponseDTO responseDTO = new ScheduleResponseDTO();
            responseDTO = toDTO(schedule);
            list1.add(responseDTO);
        }
        for (Schedule schedule : threeDaysAgoList) {
            ScheduleResponseDTO responseDTO = new ScheduleResponseDTO();
            responseDTO = toDTO(schedule);
            list2.add(responseDTO);
            Comparator<ScheduleResponseDTO> comparatorAsc = (sche1, sche2) -> sche1.getDate()
                    .compareTo(sche1.getDate());
            Collections.sort(list2, comparatorAsc);
        }
        dto.setTodayClasses(list1);
        dto.setThreeDaysAgo(list2);
        return ResponseEntity.ok(dto);
    }

    public ScheduleResponseDTO toDTO(Schedule entity) {
        ScheduleResponseDTO responseDTO = new ScheduleResponseDTO();

        responseDTO.setId(entity.getScheduleId());
        Classes clazz = entity.getClasses();

        if (clazz != null) {
            responseDTO.setClassCode(clazz.getCode());
        }
        if (entity.getClassSetting() != null) {
            responseDTO.setSlot(entity.getClassSetting().getSettingValue());
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
        if (entity.getTopic() != null) {
            responseDTO.setTopic(entity.getTopic());
        }
        responseDTO.setStatus(entity.getStatus());
        return responseDTO;
    }

}
