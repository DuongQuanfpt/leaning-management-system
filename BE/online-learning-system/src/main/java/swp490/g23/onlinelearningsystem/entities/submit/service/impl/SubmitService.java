package swp490.g23.onlinelearningsystem.entities.submit.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.IssueRepository;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.s3amazon.service.impl.S3Service;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.NewSubmitFilter;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterGroupDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitFilterMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitMemberFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitRequirementFilter;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementWrapper;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitResponseDTO;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria.SubmitCriteria;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity.SubmitQuery;
import swp490.g23.onlinelearningsystem.entities.submit.service.ISubmitService;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.util.enumutil.SubmitWorkStatusEnum;
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
    private SubmitWorkRepository submitWorkRepository;

    @Autowired
    private IssueRepository issueRepository;

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
            dto.setGroup(toGroupFilterDto(submit.getGroup()));
        }

        dto.setTraineeTitle(submit.getClassUser().getUser().getAccountName());
        dto.setFullName(submit.getClassUser().getUser().getFullName());
        dto.setStatus(submit.getStatus().toString());

        if (submit.getSubmitTime() != null) {
            dto.setLastUpdate(submit.getModifiedDate().toString());

        }

        if (submit.getSubmitFileUrl() != null) {
            dto.setSubmitUrl(submit.getSubmitFileUrl());
        }
        return dto;
    }

    @Override
    public ResponseEntity<SubmitFilterDTO> getSubmitListFilter(User user, String classCode, boolean isGroup) {
        SubmitFilterDTO filterDTO = new SubmitFilterDTO();

        List<Milestone> milestoneOfClass = milestoneRepository.getByClassCodeInProgressAndClosed(classCode);
        List<SubmitFilterMilestoneDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            if (isGroup == true && milestone.getAssignment().isTeamWork()) {
                dtos.add(toMilestoneFilterDto(milestone));
            }

            if (isGroup == false && !milestone.getAssignment().isTeamWork()) {
                dtos.add(toMilestoneFilterDto(milestone));
            }

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
        List<SubmitMemberFilterDTO> noGroupMember = new ArrayList<>();
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
                SubmitMemberFilterDTO memberFilterDTO = new SubmitMemberFilterDTO();

                memberFilterDTO.setId(submit.getClassUser().getUser().getUserId());
                memberFilterDTO.setUsername(submit.getClassUser().getUser().getAccountName());
                noGroupMember.add(memberFilterDTO);
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

        List<SubmitMemberFilterDTO> members = new ArrayList<>();
        for (GroupMember member : group.getGroupMembers()) {
            members.add(toMemberDTO(member));
        }
        groupDTO.setMemberId(members);
        return groupDTO;
    }

    private SubmitMemberFilterDTO toMemberDTO(GroupMember member) {
        SubmitMemberFilterDTO dto = new SubmitMemberFilterDTO();
        dto.setId(member.getMember().getUserId());
        dto.setUsername(member.getMember().getAccountName());
        dto.setLeader(member.getIsLeader());

        return dto;
    }

    @Override
    public ResponseEntity<String> newSubmit(User user, Long submitId, SubmitRequirementWrapper requestDTO,
            MultipartFile file) {
        Submit submit = submitRepository.findById(submitId)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));

        User currentUser = userRepository.findById(user.getUserId()).get();
        if (!currentUser.equals(submit.getClassUser().getUser())) {
            throw new CustomException("not owner of this submit");
        }

        List<Issue> requirements = new ArrayList<>();
        for (Long rId : requestDTO.getRequirementIds()) {
            Issue requirement = issueRepository.findById(rId)
                    .orElseThrow(() -> new CustomException("requirement doesnt exist"));
            requirements.add(requirement);
        }

        String fileName = submit.getClassUser().getUser().getAccountName() + "" + submit.getSubmitId();

        if (submit.getSubmitFileUrl() != null) {
            s3Service.deteleSubmit(submit.getSubmitFileUrl());
        }

        String submitUrl = s3Service.saveSubmit(file, fileName);
        if (submitUrl == null) {
            throw new CustomException("file upload failed");
        }

        submit.setSubmitFileUrl(submitUrl);
        submit.setSubmitTime(LocalDateTime.now());
        submit.setStatus(SubmitStatusEnum.Submitted);
        submitRepository.save(submit);

        submitWorkRepository.removeWorkOfSubmit(submit);

        List<SubmitWork> submitWorks = new ArrayList<>();
        for (Issue requirement : requirements) {
            SubmitWork submitWork = new SubmitWork();
            submitWork.setSubmit(submit);
            submitWork.setWork(requirement);
            submitWork.setMilestone(submit.getMilestone());
            submitWork.setStatus(SubmitWorkStatusEnum.Submitted);

            submitWorks.add(submitWork);
        }

        submitWorkRepository.saveAll(submitWorks);
        return ResponseEntity.ok("file submitted");
    }

    @Override
    public ResponseEntity<NewSubmitFilter> newSubmitFilter(User user, Long submitId) {
        Submit submit = submitRepository.findById(submitId)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));

        NewSubmitFilter filter = new NewSubmitFilter();

        if (submit.getSubmitFileUrl() != null) {
            filter.setCurrentSubmitUrl(submit.getSubmitFileUrl());
        }

        if (submit.getSubmitTime() != null) {
            filter.setLastSubmit(submit.getSubmitTime().toString());
        }

        List<SubmitMemberFilterDTO> memberFilterDTOs = new ArrayList<>();
        if(submit.getGroup() != null){
            for (GroupMember member : submit.getGroup().getGroupMembers()) {
                memberFilterDTOs.add(toMemberDTO(member));
            }
        }


        List<SubmitRequirementFilter> requirementSubmitted = new ArrayList<>();
        if (!submit.getSubmitWorks().isEmpty()) {
            for (SubmitWork work : submit.getSubmitWorks()) {
                requirementSubmitted
                        .add(toRequirementFilter(work.getWork()));
            }
        }

        List<SubmitRequirementFilter> requirementFilters = new ArrayList<>();
        for (Issue issue : submit.getMilestone().getIssues()) {
            if (issue.getType() == null) {
                requirementFilters.add(toRequirementFilter(issue));
            }
        }
        filter.setMilestone(submit.getMilestone().getTitle());
        filter.setAssigneeOfGroup(memberFilterDTOs);
        filter.setMilestoneOfGroup(null);
        filter.setRequirementStatus(null);
        filter.setStatus(submit.getStatus().toString());
        filter.setRequirementSubmitted(requirementSubmitted);
        filter.setRequirement(requirementFilters);
        return ResponseEntity.ok(filter);
    }

    public SubmitRequirementFilter toRequirementFilter(Issue issue) {
        SubmitRequirementFilter requirementFilter = new SubmitRequirementFilter();
        requirementFilter.setId(issue.getIssueId());
        requirementFilter.setTitle(issue.getTitle());

        if (issue.getAsignee() != null) {
            requirementFilter.setAssignee(issue.getAsignee().getAccountName());
        }

        if (issue.isClosed()) {
            requirementFilter.setStatus("Closed");
        } else {
            if (issue.getStatus() == null) {
                requirementFilter.setStatus("Open");
            } else {
                requirementFilter.setStatus(issue.getStatus().toString());
            }
        }

        return requirementFilter;
    }
}
