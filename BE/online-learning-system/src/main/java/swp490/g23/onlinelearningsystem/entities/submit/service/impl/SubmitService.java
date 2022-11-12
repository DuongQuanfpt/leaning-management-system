package swp490.g23.onlinelearningsystem.entities.submit.service.impl;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.Response;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl.S3Service;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterGroupDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementWrapper;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitResponseDTO;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria.SubmitCriteria;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity.SubmitQuery;
import swp490.g23.onlinelearningsystem.entities.submit.service.ISubmitService;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.SubmitStatusEntity;

@Service
public class SubmitService implements ISubmitService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SubmitCriteria submitCriteria;

    @Autowired
    private SubmitRepository submitRepository;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private S3Service s3Service;

    @Override
    public ResponseEntity<SubmitPaginateDTO> displaySubmit(int limit, int page, String keyword, Long milestoneId,
            Long assignmentId, Long groupId, Long statusValue, User user, String classCode, boolean isGroup) {
        User currentUser = userRepository.findById(user.getUserId()).get();
        SubmitQuery result = submitCriteria.searchFilterSubmit(keyword, statusValue, milestoneId, groupId, assignmentId,
                user, classCode, isGroup);
        TypedQuery<Submit> queryResult = result.getResultQuery();
        TypedQuery<Long> countQuery = result.getCountQuery();

        Long totalItem = countQuery.getSingleResult();
        int totalPage;
        if (limit != 0) {
            queryResult.setFirstResult((page - 1) * limit);
            queryResult.setMaxResults(limit);
            totalPage = (int) Math.ceil((double) totalItem / limit);
        } else {
            totalPage = 1;
        }

        List<SubmitResponseDTO> submitList = new ArrayList<>();
        for (Submit submit : queryResult.getResultList()) {
            submitList.add(toDTO(submit));
        }

        SubmitPaginateDTO paginateDTO = new SubmitPaginateDTO();
        paginateDTO.setPage(page);
        paginateDTO.setListResult(submitList);
        paginateDTO.setTotalItem(totalItem);
        paginateDTO.setTotalPage(totalPage);

        return ResponseEntity.ok(paginateDTO);
    }

    public SubmitResponseDTO toDTO(Submit submit) {
        SubmitResponseDTO dto = new SubmitResponseDTO();
        dto.setSubmitId(submit.getSubmitId());
        dto.setAssignmentTitle(submit.getMilestone().getAssignment().getTitle());
        dto.setMilestoneTitle(submit.getMilestone().getTitle());

        if (submit.getGroup() != null) {
            dto.setGroupTitle(submit.getGroup().getGroupCode());
        }

        dto.setTraineeTitle(submit.getClassUser().getUser().getAccountName());
        dto.setStatus(submit.getStatus().toString());

        if (submit.getSubmitTime() != null) {
            dto.setLastUpdate(submit.getModifiedDate().toString());

        }
        return dto;
    }

    @Override
    public ResponseEntity<SubmitFilterDTO> getSubmitListFilter(User user, String classCode) {
        SubmitFilterDTO filterDTO = new SubmitFilterDTO();

        List<Milestone> milestoneOfClass = milestoneRepository.getByClassCodeInProgressAndClosed(classCode);
        List<SubmitFilterMilestoneDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneFilterDto(milestone));
        }

        List<SubmitStatusEntity> statusFilter = new ArrayList<>();
        for (SubmitStatusEnum status : new ArrayList<SubmitStatusEnum>(
                EnumSet.allOf(SubmitStatusEnum.class))) {
            statusFilter.add(new SubmitStatusEntity(status));
        }

        filterDTO.setMilestoneFilter(dtos);
        filterDTO.setStatusFilter(statusFilter);
        return ResponseEntity.ok(filterDTO);
    }

    private SubmitFilterMilestoneDTO toMilestoneFilterDto(Milestone milestone) {
        SubmitFilterMilestoneDTO dto = new SubmitFilterMilestoneDTO();
        dto.setAssignmentTitle(milestone.getAssignment().getTitle());
        dto.setMilestoneId(milestone.getMilestoneId());
        dto.setMilestoneTitle(milestone.getTitle());
        dto.setTeamwork(milestone.getAssignment().isTeamWork());
        dto.setStatus(milestone.getStatus().toString());
        List<SubmitFilterGroupDTO> groups = new ArrayList<>();
        SubmitFilterGroupDTO noGroup = new SubmitFilterGroupDTO();
        List<String> noGroupMember = new ArrayList<>();
        noGroup.setGroupId((long) 0);
        noGroup.setGroupName("Waiting List");

        for (Submit submit : milestone.getSubmits()) {
            if (submit.getGroup() != null) {

                boolean exist = false;
                for (SubmitFilterGroupDTO groupFilterDTO : groups) {
                    if (groupFilterDTO.getGroupId() == submit.getGroup().getGroupId()) {
                        exist = true;
                        break;
                    }
                }

                if (exist == false) {
                    groups.add(toGroupFilterDto(submit.getGroup()));
                }
            } else if (submit.getGroup() == null) {
                noGroupMember.add(submit.getClassUser().getUser().getAccountName());
            }
        }
        noGroup.setMemberId(noGroupMember);
        groups.add(noGroup);
        dto.setGroups(groups);
        return dto;
    }

    private SubmitFilterGroupDTO toGroupFilterDto(Group group) {
        SubmitFilterGroupDTO groupDTO = new SubmitFilterGroupDTO();
        groupDTO.setGroupId(group.getGroupId());
        groupDTO.setGroupName(group.getGroupCode());
        groupDTO.setGroupTopic(group.getTopicName());

        List<String> members = new ArrayList<>();
        for (GroupMember member : group.getGroupMembers()) {
            members.add(member.getMember().getAccountName());
        }
        groupDTO.setMemberId(members);
        return groupDTO;
    }

    @Override
    public ResponseEntity<String> newSubmit(User user, Long submitId, SubmitRequirementWrapper requestDTO ,MultipartFile file) {
        Submit submit = submitRepository.findById(submitId)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));
        
        String fileName = submit.getClassUser().getUser().getAccountName() +""+submit.getSubmitId();
        String submitUrl = s3Service.saveAssignment(file, fileName);
        if(submitUrl == null){
            throw new CustomException("file upload failed");
        }
                
        return ResponseEntity.ok(submitUrl);
    }
}
