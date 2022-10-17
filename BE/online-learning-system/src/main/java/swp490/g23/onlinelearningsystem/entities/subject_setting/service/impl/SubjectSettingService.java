package swp490.g23.onlinelearningsystem.entities.subject_setting.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.SubjectSetting;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.filter.SubjectSettingFilterValue;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingPaginate;
import swp490.g23.onlinelearningsystem.entities.subject_setting.domain.response.SubjectSettingResponse;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.SubjectSettingRepository;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.criteria.SubjectSettingCriteria;
import swp490.g23.onlinelearningsystem.entities.subject_setting.repositories.criteriaEntity.SubjectSettingQuery;
import swp490.g23.onlinelearningsystem.entities.subject_setting.service.ISubjectSettingService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.enumutil.Status;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.StatusEntity;

@Service
public class SubjectSettingService implements ISubjectSettingService {

    @Autowired
    private SubjectSettingRepository subjectSettingRepository;

    @Autowired
    private SubjectSettingCriteria subjectSettingCriteria;

    @Autowired
    private UserRepository userRepository;

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
                    if (!filterValue.getValue().equals(subjectSetting.getType().getSettingValue())) {
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

    public SubjectSettingResponse toDTO(SubjectSetting entity) {
        SubjectSettingResponse responseDTO = new SubjectSettingResponse();

        responseDTO.setSubjectSettingId(entity.getSubjectSettingId());
        responseDTO.setTypeName(entity.getType().getSettingTitle());
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
