package swp490.g23.onlinelearningsystem.entities.milestone.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.assignment.domain.response.AssignmentResponseDTO;
import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestonePaginateDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.response.MilestoneResponseDTO;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria.MilestoneCriteria;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.criteria_entity.MilestoneQuery;
import swp490.g23.onlinelearningsystem.entities.milestone.service.IMilestoneService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.util.enumutil.MilestoneStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.MilestoneStatusEntity;

@Service
public class MilestoneService implements IMilestoneService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MilestoneCriteria milestoneCriteria;

    @Override
    public ResponseEntity<MilestonePaginateDTO> displayMilestone(String keyword, int limit, int page,
            String filterClass, String filterAss, String filterStatus, User user) {

        List<MilestoneResponseDTO> resultList = new ArrayList<>();
        List<String> classFilter = new ArrayList<>();
        List<AssignmentResponseDTO> typeFilter = new ArrayList<>();
        List<MilestoneStatusEntity> statusFilter = new ArrayList<>();

        User currentUser = userRepository.findById(user.getUserId()).get();

        MilestoneQuery result = milestoneCriteria.searchFilterMilestone(keyword, filterStatus,
                filterAss, filterClass, currentUser);
        TypedQuery<Milestone> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();
        List<Milestone> milestones = queryResult.getResultList();

        for (MilestoneStatusEnum status : new ArrayList<MilestoneStatusEnum>(
                EnumSet.allOf(MilestoneStatusEnum.class))) {
            statusFilter.add(new MilestoneStatusEntity(status));
        }

        for (Milestone milestone : milestones) {
            if (milestone.getClasses() != null) {
                if (!classFilter.contains((milestone.getClasses().getCode()))) {
                    classFilter.add((milestone.getClasses().getCode()));
                }
            }

            // if (subjectSetting.getType() != null) {
            //     boolean canAdd = true;

            //     for (SubjectSettingFilterValue filterValue : typeFilter) {

            //         if (filterValue.getValue().equals(subjectSetting.getType().getSettingValue())) {
            //             canAdd = false;
            //             break;
            //         }
            //     }

            //     if (canAdd == true) {
            //         typeFilter.add(new SubjectSettingFilterValue(subjectSetting.getType().getSettingTitle(),
            //                 subjectSetting.getType().getSettingValue()));
            //     }
            // }
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

        for (Milestone milestone : queryResult.getResultList()) {
            resultList.add(toDTO(milestone));
        }

        MilestonePaginateDTO dto = new MilestonePaginateDTO();
        dto.setPage(page);
        dto.setTotalItem(toltalItem);
        dto.setTotalPage(totalPage);
        dto.setListResult(resultList);
        dto.setStatusFilter(statusFilter);
        dto.setClassFilter(classFilter);

        return ResponseEntity.ok(dto);
    }

    public MilestoneResponseDTO toDTO(Milestone entity) {
        MilestoneResponseDTO responseDTO = new MilestoneResponseDTO();

        responseDTO.setMilestoneId(entity.getMilestoneId());
        responseDTO.setAssignment(
                new AssignmentResponseDTO(entity.getAssignment().getAssId(), entity.getAssignment().getTitle()));
        responseDTO.setClassesCode(entity.getClasses().getCode());
        responseDTO.setStatus(entity.getStatus().toString());
        if (entity.getDescription() != null) {
            responseDTO.setDescription(entity.getDescription());
        }

        if (entity.getFromDate() != null) {
            responseDTO.setFromDate(entity.getFromDate().toString());
        }

        if (entity.getToDate() != null) {
            responseDTO.setToDate(entity.getToDate().toString());
        }

        if (entity.getTitle() != null) {
            responseDTO.setTitle(entity.getTitle());
        }

        return responseDTO;
    }

}
