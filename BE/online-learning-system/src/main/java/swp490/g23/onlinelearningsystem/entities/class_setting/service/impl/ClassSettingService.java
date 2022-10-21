package swp490.g23.onlinelearningsystem.entities.class_setting.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.filter.ClassSettingFilter;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.filter.ClassSettingFilterValue;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.request.ClassSettingRequestDTO;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.response.ClassSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.response.ClassSettingResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.ClassSettingRepository;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.criteria.ClassSettingCriteria;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.criteriaEntity.ClassSettingQuery;
import swp490.g23.onlinelearningsystem.entities.class_setting.service.IClassSettingService;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassSettingEnum.IssueStatus;
import swp490.g23.onlinelearningsystem.util.enumutil.ClassSettingEnum.IssueType;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class ClassSettingService implements IClassSettingService {

    @Autowired
    private ClassSettingCriteria classSettingCriteria;

    @Autowired
    private ClassSettingRepository classSettingRepository;

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<ClassSettingPaginate> getClassSetting(int limit, int page, String keyword,
            String filterStatus, String filterClass, String filterType, User user) {
        List<ClassSettingResponseDTO> resultList = new ArrayList<>();
        List<String> classFilter = new ArrayList<>();
        List<ClassSettingFilterValue> typeFilter = new ArrayList<>();
        List<StatusEntity> statusFilter = new ArrayList<>();

        User currentUser = userRepository.findById(user.getUserId()).get();

        ClassSettingQuery result = classSettingCriteria.searchFilterClassSetting(keyword, filterStatus,
                filterType, filterClass, currentUser);
        TypedQuery<ClassSetting> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        List<ClassSetting> classSettings = queryResult.getResultList();
        Long totalPage = countQuery.getSingleResult();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusFilter.add(new StatusEntity(status));
        }

        for (ClassSetting classSetting : classSettings) {
            if (classSetting.getClasses() != null) {
                if (!classFilter.contains((classSetting.getClasses().getCode()))) {
                    classFilter.add((classSetting.getClasses().getCode()));
                }
            }

            if (classSetting.getType() != null) {
                boolean canAdd = true;
                for (ClassSettingFilterValue filterValue : typeFilter) {
                    
                    if (filterValue.getValue().equals(classSetting.getType().getSettingValue())) {
                        canAdd = false;
                        break;
                    }
                }

                if (canAdd == true) {
                    typeFilter.add(new ClassSettingFilterValue(classSetting.getType().getSettingTitle(),
                            classSetting.getType().getSettingValue()));
                }
            }
        }

        for (ClassSetting classSetting : classSettings) {
            resultList.add(toDTO(classSetting));
        }

        ClassSettingPaginate classSettingPaginate = new ClassSettingPaginate();
        classSettingPaginate.setTotalItem(totalPage);
        classSettingPaginate.setPage(page);
        classSettingPaginate.setListResult(resultList);
        classSettingPaginate.setStatusFilter(statusFilter);
        classSettingPaginate.setClassFilter(classFilter);
        classSettingPaginate.setTypeFilter(typeFilter);

        return ResponseEntity.ok(classSettingPaginate);
    }

    @Override
    public ResponseEntity<ClassSettingResponseDTO> viewClassSetting(Long id) {
        ClassSetting dto = classSettingRepository.findById(id)
                .orElseThrow(() -> new CustomException("Setting doesnt exist"));
        return ResponseEntity.ok(toDTO(dto));
    }

    @Override
    public ResponseEntity<String> addClassSetting(ClassSettingRequestDTO requestDTO) {
        ClassSetting classSetting = new ClassSetting();

        if (requestDTO.getClassCode() != null) {
            classSetting.setClasses(classRepositories.findClassByCode(requestDTO.getClassCode()));
        } else {
            throw new CustomException("Must assign to a class");
        }

        if (requestDTO.getTypeValue() != null) {
            classSetting.setType(settingRepositories.findBySettingValue(requestDTO.getTypeValue()));
        } else {
            throw new CustomException("Must assign to a type");
        }

        if (requestDTO.getSettingTitle() != null) {
            classSetting.setSettingTitle(requestDTO.getSettingTitle());
        }

        if (requestDTO.getSettingValue() != null) {
            classSetting.setSettingValue(requestDTO.getSettingValue());
        }

        if (requestDTO.getDescription() != null) {
            classSetting.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getDisplayOrder() != null) {
            classSetting.setDisplayOrder(requestDTO.getDisplayOrder());
        }

        if (requestDTO.getStatus() != null) {
            classSetting.setStatus(Status.getFromValue(Integer.parseInt(requestDTO.getStatus())).get());
        }

        classSettingRepository.save(classSetting);
        return ResponseEntity.ok("Class setting added");
    }

    @Override
    public ResponseEntity<String> editClassSetting(Long id, ClassSettingRequestDTO requestDTO) {
        ClassSetting classSetting = classSettingRepository.findById(id)
                .orElseThrow(() -> new CustomException("Class setting doesnt exist"));

        if (requestDTO.getSettingTitle() != null) {
            classSetting.setSettingTitle(requestDTO.getSettingTitle());
        }

        if (requestDTO.getSettingValue() != null) {
            classSetting.setSettingValue(requestDTO.getSettingValue());
        }

        if (requestDTO.getDescription() != null) {
            classSetting.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getDisplayOrder() != null) {
            classSetting.setDisplayOrder(requestDTO.getDisplayOrder());
        }

        if (requestDTO.getStatus() != null) {
            classSetting.setStatus(Status.getFromValue(Integer.parseInt(requestDTO.getStatus())).get());
        }

        classSettingRepository.save(classSetting);
        return ResponseEntity.ok("Class setting updated");
    }

    @Override
    public ResponseEntity<ClassSettingFilter> getClassSettingFilter() {
        ClassSettingFilter filter = new ClassSettingFilter();  
        List<Classes> classes = classRepositories.findAll();
        List<Setting> types = settingRepositories.classSettingList();

        List<StatusEntity> statusFilter = new ArrayList<>();
        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusFilter.add(new StatusEntity(status));
        }

        List<String> issueStatus = new ArrayList<>();
        for (IssueStatus status  : new ArrayList<IssueStatus>(EnumSet.allOf(IssueStatus.class))) {
            issueStatus.add(status.toString());
        }

        List<String> issueType = new ArrayList<>();
        for (IssueType type : new ArrayList<IssueType>(EnumSet.allOf(IssueType.class))) {
            issueType.add(type.toString());
        }

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusFilter.add(new StatusEntity(status));
        }

        List<String> classCodes = new ArrayList<>();
        for (Classes c : classes) {
            classCodes.add(c.getCode());
        }

        List<ClassSettingFilterValue> typeFilter = new ArrayList<>();
        for (Setting type : types) {
            typeFilter.add(new ClassSettingFilterValue(type.getSettingTitle(), type.getSettingValue()));
        }

        filter.setStatusFilter(statusFilter);
        filter.setClassFilter(classCodes);
        filter.setTypeFilter(typeFilter);
        filter.setIssueStatus(issueStatus);
        filter.setIssueType(issueType);

        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<String> activateClassSetting(Long id) {
        ClassSetting classSetting = classSettingRepository.findById(id)
                .orElseThrow(() -> new CustomException("Subject setting doesnt exist"));
        if(classSetting.getStatus() == Status.Active){
            classSetting.setStatus(Status.Inactive);      
        } else {
            classSetting.setStatus(Status.Active);      
        }

        classSettingRepository.save(classSetting);
        return ResponseEntity.ok("Setting status changed");
    }

    public ClassSettingResponseDTO toDTO(ClassSetting entity) {
        ClassSettingResponseDTO responseDTO = new ClassSettingResponseDTO();

        responseDTO.setClassSettingId(entity.getClassSettingId());
        responseDTO.setTypeName(
                new ClassSettingFilterValue(entity.getType().getSettingTitle(), entity.getType().getSettingValue()));
        responseDTO.setStatus(entity.getStatus().toString());
        if (entity.getClasses() != null) {
            responseDTO.setClassCode(entity.getClasses().getCode());
        }

        if (entity.getDescription() != null) {
            responseDTO.setDescription(entity.getDescription());
        }

        if (entity.getDisplayOrder() != null) {
            responseDTO.setDisplayOrder(entity.getDisplayOrder());
        }

        if (entity.getSettingTitle() != null) {
            responseDTO.setSettingTitle(entity.getSettingTitle());
        }

        if (entity.getSettingValue() != null) {
            responseDTO.setSettingValue(entity.getSettingValue());
        }

        return responseDTO;
    }

    

}
