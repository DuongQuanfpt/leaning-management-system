package swp490.g23.onlinelearningsystem.entities.subject_setting.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.subject.domain.Subject;
import swp490.g23.onlinelearningsystem.entities.subject.repositories.SubjecRepository;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.filter.SubjectSettingFilter;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.filter.SubjectSettingFilterValue;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.request.SubjectSettingRequest;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingResponse;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.SubjectSettingRepository;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.criteria.SubjectSettingCriteria;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.criteriaEntity.SubjectSettingQuery;
import swp490.g23.onlinelearningsystem.entities.subject_setting.service.ISubjectSettingService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.SubjectSettingEnum.ComplexityEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.SubjectSettingEnum.QualityEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class SubjectSettingService implements ISubjectSettingService {

    @Autowired
    private SubjectSettingRepository subjectSettingRepository;

    @Autowired
    private SubjectSettingCriteria subjectSettingCriteria;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubjecRepository subjecRepository;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<SubjectSettingPaginate> getSubjectSetting(int limit, int page, String keyword,
            String filterStatus,
            String filterSubject, String filterType, User user) {
        List<SubjectSettingResponse> resultList = new ArrayList<>();
        List<String> subjectFilter = new ArrayList<>();
        List<SubjectSettingFilterValue> typeFilter = new ArrayList<>();
        List<StatusEntity> statusFilter = new ArrayList<>();

        User currentUser = userRepository.findById(user.getUserId()).get();

        SubjectSettingQuery result = subjectSettingCriteria.searchFilterSubjectSetting(keyword, filterStatus,
                filterType, filterSubject, currentUser);
        TypedQuery<SubjectSetting> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();
        List<SubjectSetting> subjectSettings = queryResult.getResultList();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusFilter.add(new StatusEntity(status));
        }

        for (SubjectSetting subjectSetting : subjectSettings) {
            if (subjectSetting.getSubject() != null) {
                if (!subjectFilter.contains((subjectSetting.getSubject().getSubjectCode()))) {
                    subjectFilter.add((subjectSetting.getSubject().getSubjectCode()));
                }
            }

            if (subjectSetting.getType() != null) {
                boolean canAdd = true;

                for (SubjectSettingFilterValue filterValue : typeFilter) {

                    if (filterValue.getValue().equals(subjectSetting.getType().getSettingValue())) {
                        canAdd = false;
                        break;
                    }
                }

                if (canAdd == true) {
                    typeFilter.add(new SubjectSettingFilterValue(subjectSetting.getType().getSettingTitle(),
                            subjectSetting.getType().getSettingValue()));
                }
            }
        }

        Long toltalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) toltalItem / limit);
        } else {
            totalPage = 1;
        }

        for (SubjectSetting subjectSetting : queryResult.getResultList()) {
            resultList.add(toDTO(subjectSetting));
        }

        SubjectSettingPaginate dto = new SubjectSettingPaginate();
        dto.setPage(page);
        dto.setTotalItem(toltalItem);
        dto.setTotalPage(totalPage);
        dto.setListResult(resultList);
        dto.setStatusFilter(statusFilter);
        dto.setTypeFilter(typeFilter);
        dto.setSubjectFilter(subjectFilter);

        return ResponseEntity.ok(dto);
    }

    @Override
    public ResponseEntity<String> updateSubjectSetting(Long id, SubjectSettingRequest request) {
        SubjectSetting subjectSetting = subjectSettingRepository.findById(id)
                .orElseThrow(() -> new CustomException("Subject setting doesnt exist"));

        if (request.getSettingTitle() != null) {
            subjectSetting.setSettingTitle(request.getSettingTitle());
        }

        if (request.getSettingValue() != null) {
            subjectSetting.setSettingValue(request.getSettingValue());
        }

        if (request.getDescription() != null) {
            subjectSetting.setDescription(request.getDescription());
        }

        if (request.getDisplayOrder() != null) {
            subjectSetting.setDisplayOrder(request.getDisplayOrder());
        }

        if (request.getStatus() != null) {
            subjectSetting.setStatus(Status.getFromValue(Integer.parseInt(request.getStatus())).get());
        }

        subjectSettingRepository.save(subjectSetting);
        return ResponseEntity.ok("Subject setting updated");
    }

    @Override
    public ResponseEntity<String> addSubjectSetting(SubjectSettingRequest request) {
        SubjectSetting subjectSetting = new SubjectSetting();

        if (request.getSubjectCode() != null) {
            subjectSetting.setSubject(subjecRepository.findBySubjectCode(request.getSubjectCode()));
        } else {
            throw new CustomException("Must assign to a subject");
        }

        if (request.getTypeValue() != null) {
            subjectSetting.setType(settingRepositories.findBySettingValue(request.getTypeValue()));
        } else {
            throw new CustomException("Must assign to a type");
        }

        if (request.getSettingTitle() != null) {
            subjectSetting.setSettingTitle(request.getSettingTitle());
        }

        if (request.getSettingValue() != null) {
            subjectSetting.setSettingValue(request.getSettingValue());
        }

        if (request.getDescription() != null) {
            subjectSetting.setDescription(request.getDescription());
        }

        if (request.getDisplayOrder() != null) {
            subjectSetting.setDisplayOrder(request.getDisplayOrder());
        }

        if (request.getStatus() != null) {
            subjectSetting.setStatus(Status.getFromValue(Integer.parseInt(request.getStatus())).get());
        }

        subjectSettingRepository.save(subjectSetting);
        return ResponseEntity.ok("Subject setting added");
    }

    @Override
    public ResponseEntity<SubjectSettingResponse> viewSubjectSetting(Long id) {
        SubjectSetting subjectSetting = subjectSettingRepository.findById(id)
                .orElseThrow(() -> new CustomException("Setting doesnt exist"));
        return ResponseEntity.ok(toDTO(subjectSetting));
    }

    @Override
    public ResponseEntity<SubjectSettingFilter> subjectSettingFilter() {
        SubjectSettingFilter filter = new SubjectSettingFilter();
        List<StatusEntity> statusFilter = new ArrayList<>();
        List<Subject> subjects = subjecRepository.findAll();
        List<Setting> types = settingRepositories.subjectSettingList();

        for (Status status : new ArrayList<Status>(EnumSet.allOf(Status.class))) {
            statusFilter.add(new StatusEntity(status));
        }

        List<String> subjectCodes = new ArrayList<>();
        for (Subject subject : subjects) {
            subjectCodes.add(subject.getSubjectCode());
        }

        List<SubjectSettingFilterValue> typeFilter = new ArrayList<>();
        for (Setting type : types) {
            typeFilter.add(new SubjectSettingFilterValue(type.getSettingTitle(), type.getSettingValue()));
        }

        List<String> complexity = new ArrayList<>();
        for (ComplexityEnum complexityEnum : new ArrayList<ComplexityEnum>(EnumSet.allOf(ComplexityEnum.class))) {
            complexity.add(complexityEnum.toString());
        }

        List<String> quality = new ArrayList<>();
        for (QualityEnum qualityEnum : new ArrayList<QualityEnum>(EnumSet.allOf(QualityEnum.class))) {
            quality.add(qualityEnum.toString());
        }

        filter.setStatusFilter(statusFilter);
        filter.setSubjectFilter(subjectCodes);
        filter.setTypeFilter(typeFilter);
        filter.setQuality(quality);
        filter.setComplexity(complexity);

        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<String> activateSubjectSetting(Long id) {
        SubjectSetting subjectSetting = subjectSettingRepository.findById(id)
                .orElseThrow(() -> new CustomException("Subject setting doesnt exist"));
        if(subjectSetting.getStatus() == Status.Active){
            subjectSetting.setStatus(Status.Inactive);      
        } else {
            subjectSetting.setStatus(Status.Active);      
        }
       
        subjectSettingRepository.save(subjectSetting);
        return ResponseEntity.ok("Setting status changed");
    }

    public SubjectSettingResponse toDTO(SubjectSetting entity) {
        SubjectSettingResponse responseDTO = new SubjectSettingResponse();

        responseDTO.setSubjectSettingId(entity.getSubjectSettingId());
        responseDTO.setTypeName(
                new SubjectSettingFilterValue(entity.getType().getSettingTitle(), entity.getType().getSettingValue()));
        responseDTO.setStatus(entity.getStatus().toString());
        if (entity.getSubject() != null) {
            responseDTO.setSubjectCode(entity.getSubject().getSubjectCode());
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
