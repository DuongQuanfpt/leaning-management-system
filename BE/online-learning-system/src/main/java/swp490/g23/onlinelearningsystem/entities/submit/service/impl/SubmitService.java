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

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
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
import swp490.g23.onlinelearningsystem.entities.submit.domain.filter.SubmitSettingFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementRequestDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.request.SubmitRequirementWrapper;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitDetailDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitDetailFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitResponseDTO;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria.SubmitCriteria;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria.SubmitDetailCriteria;
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
import swp490.g23.onlinelearningsystem.util.enumutil.enumentities.SubmitWorkStatusEntity;

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

    @Autowired
    private SubmitDetailCriteria submitDetailCriteria;

    @Override
    public ResponseEntity<SubmitPaginateDTO> displaySubmit(int limit, int page, String keyword, Long milestoneId,
            Long assignmentId, Long groupId, Long statusValue, User user, String classCode, boolean isGroup) {
        // User currentUser = userRepository.findById(user.getUserId()).get();
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
        List<SubmitFilterMilestoneDTO> filterMilestoneDTOs = new ArrayList<>();
        SubmitFilterMilestoneDTO allMilestone = new SubmitFilterMilestoneDTO();
        allMilestone.setMilestoneId((long) 0);
        allMilestone.setMilestoneTitle("All Milestone");

        filterMilestoneDTOs.add(allMilestone);
        for (Milestone milestone : milestoneOfClass) {
            if (isGroup == true && milestone.getAssignment().isTeamWork()) {
                filterMilestoneDTOs.add(toMilestoneFilterDto(milestone));
            }

            if (isGroup == false && !milestone.getAssignment().isTeamWork()) {
                filterMilestoneDTOs.add(toMilestoneFilterDto(milestone));
            }

        }

        List<SubmitStatusEntity> statusFilter = new ArrayList<>();
        for (SubmitStatusEnum status : new ArrayList<SubmitStatusEnum>(
                EnumSet.allOf(SubmitStatusEnum.class))) {
            statusFilter.add(new SubmitStatusEntity(status));
        }

        filterDTO.setMilestoneFilter(filterMilestoneDTOs);
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
        Submit currentSubmit = submitRepository.findById(submitId)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));

        User currentUser = userRepository.findById(user.getUserId()).get();
        if (!currentUser.equals(currentSubmit.getClassUser().getUser())) {
            throw new CustomException("not owner of this submit");
        }

        List<SubmitWork> submitWorks = new ArrayList<>();
        for (SubmitRequirementRequestDTO requirementRequest : requestDTO.getRequirements()) {
            Submit author = new Submit();
            if (requirementRequest.getAssigneeName() == null) {
                continue;
            }

            if (currentSubmit.getGroup() != null) {
                for (Submit submit : currentSubmit.getGroup().getSubmits()) {
                    if (submit.getClassUser() != null
                            && submit.getClassUser().getUser().getAccountName()
                                    .equals(requirementRequest.getAssigneeName())
                            && submit.getMilestone().equals(currentSubmit.getMilestone())) {
                        author = submit;
                        break;
                    }
                }
            } else {
                author = currentSubmit;
            }

            Issue requirement = issueRepository.findById(requirementRequest.getRequirementId())
                    .orElseThrow(() -> new CustomException("requirement doesnt exist"));
            SubmitWork submitWork = new SubmitWork();
            submitWork.setSubmit(author);
            submitWork.setWork(requirement);
            submitWork.setMilestone(currentSubmit.getMilestone());
            submitWork.setStatus(SubmitWorkStatusEnum.Submitted);

            submitWorks.add(submitWork);
        }

        String fileName = currentSubmit.getClassUser().getUser().getAccountName() + "" + currentSubmit.getSubmitId();

        if (currentSubmit.getSubmitFileUrl() != null) {
            s3Service.deteleSubmit(currentSubmit.getSubmitFileUrl());
        }

        String submitUrl = s3Service.saveSubmit(file, fileName);
        if (submitUrl == null) {
            throw new CustomException("file upload failed");
        }

        List<Submit> submitOfGroup = new ArrayList<>();
        if (currentSubmit.getGroup() != null) {
            for (Submit submit : currentSubmit.getGroup().getSubmits()) {
                if (submit.getMilestone().equals(currentSubmit.getMilestone())) {
                    submitOfGroup.add(submit);
                }
            }
        } else {
            submitOfGroup.add(currentSubmit);
        }

        List<Submit> submitChanged = new ArrayList<>();
        for (Submit submit : submitOfGroup) {
            submit.setSubmitFileUrl(submitUrl);
            submit.setSubmitTime(LocalDateTime.now());
            submit.setStatus(SubmitStatusEnum.Submitted);
            submitChanged.add(submit);
        }

        if (currentSubmit.getGroup() != null) {
            List<SubmitWork> worksToRemove = submitWorkRepository.getByGroupAndMilestone(currentSubmit.getGroup(),
                    currentSubmit.getMilestone());
            submitWorkRepository.deleteAll(worksToRemove);
        } else {
            submitWorkRepository.removeWorkOfSubmit(currentSubmit);
        }

        submitWorkRepository.saveAll(submitWorks);
        submitRepository.saveAll(submitChanged);

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

        List<SubmitSettingFilterDTO> statusFilter = new ArrayList<>();
        for (ClassSetting classSetting : submit.getClassUser().getClasses().getTypes()) {
            if (classSetting.getType() != null
                    && classSetting.getType().getSettingValue().equals("TYPE_ISSUE_STATUS")) {
                statusFilter.add(toSettingFilterDTO(classSetting));
            }
        }

        List<SubmitMemberFilterDTO> memberFilterDTOs = new ArrayList<>();
        List<SubmitFilterMilestoneDTO> milestones = new ArrayList<>();

        SubmitFilterMilestoneDTO allMilestone = new SubmitFilterMilestoneDTO();
        allMilestone.setMilestoneId((long) 0);
        allMilestone.setMilestoneTitle("All Milestone");
        milestones.add(allMilestone);

        if (submit.getGroup() != null) {
            filter.setGroupId(submit.getGroup().getGroupId());
            filter.setGroupCode(submit.getGroup().getGroupCode());
            Group group = submit.getGroup();
            for (GroupMember member : group.getGroupMembers()) {
                memberFilterDTOs.add(toMemberDTO(member));
            }

            List<Milestone> milestoneOfGroup = milestoneRepository
                    .getByGroupInProgressAndClosed(submit.getGroup().getGroupId());
            for (Milestone milestone : milestoneOfGroup) {
                milestones.add(toMilestoneFilterDto(milestone));
            }

        } else {
            SubmitMemberFilterDTO memberFilterDTO = new SubmitMemberFilterDTO();
            memberFilterDTO.setId(submit.getClassUser().getUser().getUserId());
            memberFilterDTO.setUsername(submit.getClassUser().getUser().getAccountName());
            memberFilterDTOs.add(memberFilterDTO);

            for (Milestone milestone : submit.getClassUser().getClasses().getMilestones()) {
                if (!milestone.getAssignment().isTeamWork()) {
                    milestones.add(toMilestoneFilterDto(submit.getMilestone()));
                }
            }

        }

        List<SubmitRequirementFilter> requirementFilters = new ArrayList<>();
        for (Issue issue : submit.getMilestone().getIssues()) {
            if (issue.getType() == null) {
                if (submit.getGroup() != null) {
                    if (issue.getGroup() == null) {
                        continue;
                    }

                    if (issue.getGroup() != null && !issue.getGroup().equals(submit.getGroup())) {
                        continue;
                    }

                }

                SubmitRequirementFilter requirementFilter = toRequirementFilter(issue);
                requirementFilter.setSubmitted(false);

                if (!issue.getSubmitWorks().isEmpty()) {
                    for (SubmitWork sk : issue.getSubmitWorks()) {
                        if (submit.getGroup() != null) {
                            for (Submit s : submit.getGroup().getSubmits()) {
                                if (sk.getSubmit().equals(s)) {
                                    requirementFilter.setSubmitted(true);
                                    requirementFilter.setAssignee(s.getClassUser().getUser().getAccountName());
                                    requirementFilter.setSubmitStatus(sk.getStatus().toString());
                                    break;
                                }
                            }
                        } else {
                            if (sk.getSubmit().equals(submit)) {
                                requirementFilter.setSubmitted(true);
                                requirementFilter.setAssignee(submit.getClassUser().getUser().getAccountName());
                                requirementFilter.setSubmitStatus(sk.getStatus().toString());
                            }
                        }

                    }
                }

                requirementFilters.add(requirementFilter);
            }
        }

        filter.setMilestone(submit.getMilestone().getTitle());
        filter.setMilestoneId(submit.getMilestone().getMilestoneId());
        filter.setAssigneeOfGroup(memberFilterDTOs);
        filter.setMilestoneOfGroup(milestones);
        filter.setRequirementStatus(statusFilter);
        filter.setStatus(submit.getStatus().toString());
        filter.setRequirement(requirementFilters);
        return ResponseEntity.ok(filter);
    }

    public SubmitSettingFilterDTO toSettingFilterDTO(ClassSetting classSetting) {
        SubmitSettingFilterDTO dto = new SubmitSettingFilterDTO();
        dto.setId(classSetting.getClassSettingId());
        dto.setTitle(classSetting.getSettingValue());

        return dto;
    }

    public SubmitRequirementFilter toRequirementFilter(Issue issue) {
        SubmitRequirementFilter requirementFilter = new SubmitRequirementFilter();
        requirementFilter.setId(issue.getIssueId());
        requirementFilter.setTitle(issue.getTitle());
        requirementFilter.setMilestone(issue.getMilestone().getTitle());

        if (issue.getGroup() != null) {
            requirementFilter.setGroupId((issue.getGroup().getGroupId()));
            requirementFilter.setGroupTitle((issue.getGroup().getGroupCode()));
        }

        if (issue.isClosed()) {
            requirementFilter.setStatus("Closed");
        } else {
            if (issue.getStatus() == null) {
                requirementFilter.setStatus("Open");
            } else {
                requirementFilter.setStatus(issue.getStatus().getSettingValue());
            }
        }

        return requirementFilter;
    }

    @Override
    public ResponseEntity<SubmitDetailFilterDTO> viewSubmit(Long id, String keyword,
            String filterTeam,
            String filterAssignee, String filterStatus, Long userId) {
        User user = userRepository.findById(userId).get();
        List<SubmitDetailDTO> list = new ArrayList<>();
        List<SubmitWorkStatusEntity> statusFilter = new ArrayList<>();
        List<String> teamList = new ArrayList<>();
        List<String> assigneeList = new ArrayList<>();
        Submit currentSubmit = submitRepository.findById(id)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));
        TypedQuery<SubmitWork> queryResult = submitDetailCriteria.getSubmitWorks(keyword,
                filterTeam,
                filterAssignee, filterStatus, user);
        List<SubmitWork> submitList = queryResult.getResultList();

        for (SubmitWorkStatusEnum status : new ArrayList<SubmitWorkStatusEnum>(EnumSet.allOf(
                SubmitWorkStatusEnum.class))) {
            statusFilter.add(new SubmitWorkStatusEntity(status));
        }
        // User currentUser = userRepository.findById(user.getUserId()).get();
        // if (!currentUser.equals(currentSubmit.getClassUser().getUser())) {
        // throw new CustomException("not owner of this submit");
        // }
        // List<SubmitWork> submitWorks = currentSubmit.getSubmitWorks();
        for (SubmitWork submitWork : submitList) {
            if (currentSubmit.getGroup() == null) {
                SubmitDetailDTO dto = new SubmitDetailDTO();
                dto.setId(currentSubmit.getSubmitId());
                dto.setAssignee(currentSubmit.getClassUser().getUser().getAccountName());
                dto.setMilestone(submitWork.getMilestone().getTitle());
                dto.setRequirement(submitWork.getWork().getTitle());
                dto.setStatus(submitWork.getStatus());
                if (!submitWork.getWorkEvals().isEmpty()) {
                    if (submitWork.getWorkEvals().get(0).getNewWorkEval() != 0) {
                        dto.setGrade(submitWork.getWorkEvals().get(0).getNewWorkEval());
                    } else {
                        dto.setGrade(submitWork.getWorkEvals().get(0).getWorkEval());
                    }
                } else {
                    dto.setGrade(null);
                }
                list.add(dto);
                assigneeList.add(currentSubmit.getClassUser().getUser().getAccountName());
            } else {
                // List<SubmitWork> submits =
                // submitWorkRepository.getByGroupAndMilestone(currentSubmit.getGroup(),
                // currentSubmit.getMilestone());
                SubmitDetailDTO dto = new SubmitDetailDTO();
                dto.setId(submitWork.getSubmit().getSubmitId());
                dto.setAssignee(submitWork.getSubmit().getClassUser().getUser().getAccountName());
                dto.setMilestone(submitWork.getMilestone().getTitle());
                dto.setRequirement(submitWork.getWork().getTitle());
                dto.setStatus(submitWork.getStatus());
                dto.setTeam(submitWork.getSubmit().getGroup().getGroupCode());
                if (!submitWork.getWorkEvals().isEmpty()) {
                    if (submitWork.getWorkEvals().get(0).getNewWorkEval() != 0) {
                        dto.setGrade(submitWork.getWorkEvals().get(0).getNewWorkEval());
                    } else {
                        dto.setGrade(submitWork.getWorkEvals().get(0).getWorkEval());
                    }
                }
                list.add(dto);
                if (!assigneeList.contains(submitWork.getSubmit().getClassUser().getUser().getAccountName())) {
                    assigneeList.add(submitWork.getSubmit().getClassUser().getUser().getAccountName());
                }
                if (!teamList.contains(submitWork.getSubmit().getGroup().getGroupCode())) {
                    teamList.add(submitWork.getSubmit().getGroup().getGroupCode());
                }
            }
        }
        SubmitDetailFilterDTO filterDTO = new SubmitDetailFilterDTO();
        filterDTO.setListResult(list);
        filterDTO.setStatusFilter(statusFilter);
        filterDTO.setAssigneeFilter(assigneeList);
        filterDTO.setTeamFilter(teamList);
        return ResponseEntity.ok(filterDTO);
    }
}
