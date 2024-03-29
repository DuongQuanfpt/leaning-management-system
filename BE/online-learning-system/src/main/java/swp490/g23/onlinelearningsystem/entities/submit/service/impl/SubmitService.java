package swp490.g23.onlinelearningsystem.entities.submit.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
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
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.MilestoneFilterType;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitDetailDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitDetailFilterDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitNewResponseDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitPaginateDTO;
import swp490.g23.onlinelearningsystem.entities.submit.domain.response.SubmitResponseDTO;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.SubmitRepository;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria.SubmitCriteria;
import swp490.g23.onlinelearningsystem.entities.submit.repositories.criteria_entity.SubmitQuery;
import swp490.g23.onlinelearningsystem.entities.submit.service.ISubmitService;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWorkKey;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.entities.work_eval.domain.WorkEval;
import swp490.g23.onlinelearningsystem.entities.work_update.domain.WorkUpdate;
import swp490.g23.onlinelearningsystem.enums.SubmitStatusEnum;
import swp490.g23.onlinelearningsystem.enums.SubmitWorkStatusEnum;
import swp490.g23.onlinelearningsystem.enums.enumentities.SubmitStatusEntity;
import swp490.g23.onlinelearningsystem.enums.enumentities.SubmitWorkStatusEntity;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

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
    private MilestoneRepository milestoneRepository;

    @Autowired
    private S3Service s3Service;

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
        dto.setMilestoneId(submit.getMilestone().getMilestoneId());
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
        allMilestone.setMilestoneTitle("All Assignment");
        allMilestone.setAssignmentTitle("All Assignment");

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
    public ResponseEntity<List<SubmitNewResponseDTO>> newSubmit(User user, Long submitId,
            SubmitRequirementWrapper requestDTO,
            MultipartFile file) {
        Submit currentSubmit = submitRepository.findById(submitId)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));

        if (file == null) {
            throw new CustomException("must submit a file");
        }

        HashMap<Long, Issue> requirementOfSubmit = new HashMap<Long, Issue>();
        for (Issue issue : currentSubmit.getMilestone().getIssues()) {
            if (issue.getType() == null) {
                if (currentSubmit.getGroup() != null) {
                    if (issue.getGroup() == null) {
                        continue;
                    }

                    if (issue.getGroup() != null && !issue.getGroup().equals(currentSubmit.getGroup())) {
                        continue;
                    }
                }
                requirementOfSubmit.put(issue.getIssueId(), issue);
            }
        }

        User currentUser = userRepository.findById(user.getUserId()).get();
        if (!currentUser.getAccountName().equals(currentSubmit.getClassUser().getUser().getAccountName())) {
            throw new CustomException("not owner of this submit");
        }

        List<SubmitWork> submitWorks = new ArrayList<>();
        for (SubmitRequirementRequestDTO requirementRequest : requestDTO.getRequirements()) {
            Submit author = null;
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

                if (author == null) {
                    throw new CustomException("Request assignee not in this group");
                }
            } else {
                author = currentSubmit;
            }

            // Issue requirement =
            // issueRepository.findById(requirementRequest.getRequirementId())
            // .orElseThrow(() -> new CustomException("requirement doesnt exist"));
            Issue requirement;
            if (requirementOfSubmit.containsKey(requirementRequest.getRequirementId())) {
                requirement = requirementOfSubmit.get(requirementRequest.getRequirementId());
            } else {
                throw new CustomException("One of requested requirement list doesnt belong in this submit");
            }

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

        List<SubmitWork> savedSubmitWorks = submitWorkRepository.saveAll(submitWorks);
        submitRepository.saveAll(submitChanged);

        return ResponseEntity.ok(newResponseDTOs(savedSubmitWorks));
    }

    private List<SubmitNewResponseDTO> newResponseDTOs(List<SubmitWork> savedSubmitWorks) {
        List<SubmitNewResponseDTO> dtos = new ArrayList<>();
        for (SubmitWork submitWork : savedSubmitWorks) {
            dtos.add(new SubmitNewResponseDTO(submitWork.getSubmit().getSubmitId(), submitWork.getWork().getIssueId()));
        }
        return dtos;
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
                    milestones.add(toMilestoneFilterDto(milestone));
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
                                    if (sk.getStatus() == SubmitWorkStatusEnum.Rejected) {
                                        requirementFilter.setComment(sk.getRejectReason());
                                    } else {
                                        if (!sk.getWorkEvals().isEmpty()) {
                                            requirementFilter.setComment(sk.getWorkEvals().get(0).getComment());
                                        }

                                    }
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
            String filterAssignee, String filterMilestone, Long statusValue) {

        List<SubmitDetailDTO> list = new ArrayList<>();
        List<SubmitWorkStatusEntity> statusFilter = new ArrayList<>();
        List<String> assigneeList = new ArrayList<>();
        List<MilestoneFilterType> milestoneList = new ArrayList<>();
        Submit currentSubmit = submitRepository.findById(id)
                .orElseThrow(() -> new CustomException("submit doesnt exist"));
        Group group = currentSubmit.getGroup();

        for (SubmitWorkStatusEnum status : new ArrayList<SubmitWorkStatusEnum>(EnumSet.allOf(
                SubmitWorkStatusEnum.class))) {
            statusFilter.add(new SubmitWorkStatusEntity(status));
        }
        if (group == null) {
            SubmitDetailDTO dto = new SubmitDetailDTO();
            List<SubmitWork> submitWorks = new ArrayList<>();
            if (currentSubmit.getMilestone().getAssignment().isFinal() == false) {
                submitWorks = currentSubmit.getSubmitWorks();
            } else {
                currentSubmit.getClassUser().getSubmits();
                for (Submit submit : currentSubmit.getClassUser().getSubmits()) {
                    submitWorks.addAll(submit.getSubmitWorks());
                }
            }
            for (SubmitWork submitWork : submitWorks) {
                MilestoneFilterType milestone = new MilestoneFilterType(submitWork.getMilestone().getMilestoneId(),
                        submitWork.getMilestone().getTitle());
                boolean isAdd = true;
                boolean canAdd = true;
                if (currentSubmit.getMilestone().getAssignment().isFinal() == true) {
                    if (!submitWork.getMilestone().equals(currentSubmit.getMilestone())) {
                        if (submitWork.getSubmit().getUpdates().isEmpty()) {
                            isAdd = false;
                        }
                    }
                }
                if (filterAssignee != null) {
                    if (!filterAssignee.equals(submitWork.getSubmit().getClassUser().getUser().getAccountName())) {
                        isAdd = false;
                    }
                }
                if (statusValue != null) {
                    if (SubmitWorkStatusEnum.fromInt(statusValue.intValue()) != submitWork.getStatus()) {
                        isAdd = false;
                    }
                }
                if (filterMilestone != null) {
                    if (Long.parseLong(filterMilestone) != (submitWork.getMilestone().getMilestoneId())) {
                        isAdd = false;
                    }
                }
                if (keyword != null) {
                    if (!submitWork.getWork().getTitle().contains(keyword)) {
                        isAdd = false;
                    }
                }
                if (isAdd) {
                    dto = toDetail(submitWork);
                    if (submitWork.getSubmit().getMilestone().equals(currentSubmit.getMilestone())) {
                        dto.setFinalEvaluated(false);
                    } else {
                        for (WorkEval eval : submitWork.getWorkEvals()) {
                            if (eval.getMilestone().equals(currentSubmit.getMilestone())) {
                                dto.setFinalEvaluated(false);
                                break;
                            } else {
                                dto.setFinalEvaluated(true);

                            }
                        }
                    }
                    list.add(dto);
                    if (submitWork.getMilestone() != null) {
                        for (MilestoneFilterType type : milestoneList) {
                            if (type.getMilestoneId() == submitWork.getMilestone().getMilestoneId()) {
                                canAdd = false;
                                break;
                            }
                        }
                        if (canAdd) {
                            milestoneList.add(milestone);
                        }
                    }
                    if (!assigneeList.contains(submitWork.getSubmit().getClassUser().getUser().getAccountName())) {
                        assigneeList.add(submitWork.getSubmit().getClassUser().getUser().getAccountName());
                    }
                }
            }
            assigneeList.add(currentSubmit.getClassUser().getUser().getAccountName());
        } else {
            SubmitDetailDTO dto = new SubmitDetailDTO();
            List<SubmitWork> submitWorks = new ArrayList<>();
            if (currentSubmit.getMilestone().getAssignment().isFinal() == false) {
                for (Submit submit : currentSubmit.getGroup().getSubmits()) {
                    if (submit.getMilestone().equals(currentSubmit.getMilestone())) {
                        submitWorks.addAll(submit.getSubmitWorks());
                    }
                }
            } else {
                for (Submit submit : currentSubmit.getGroup().getSubmits()) {
                    submitWorks.addAll(submit.getSubmitWorks());
                }
            }
            for (SubmitWork submitWork : submitWorks) {
                MilestoneFilterType milestone = new MilestoneFilterType(submitWork.getMilestone().getMilestoneId(),
                        submitWork.getMilestone().getTitle());
                boolean isAdd = true;
                boolean canAdd = true;
                if (currentSubmit.getMilestone().getAssignment().isFinal() == true) {
                    // if (!submitWork.getMilestone().equals(currentSubmit.getMilestone())) {
                    // for (WorkUpdate update : submitWork.getSubmit().getUpdates()) {
                    // if (!update.getRequirement().equals(submitWork.getWork())) {
                    // isAdd = false;
                    // } else {
                    // isAdd = true;
                    // break;
                    // }
                    // }
                    // }
                    if (!submitWork.getMilestone().equals(currentSubmit.getMilestone())) {
                        if (submitWork.getSubmit().getUpdates().isEmpty()) {
                            isAdd = false;
                        }
                    }
                }
                if (filterAssignee != null) {
                    if (!filterAssignee.equals(submitWork.getSubmit().getClassUser().getUser().getAccountName())) {
                        isAdd = false;
                    }
                }
                if (statusValue != null) {
                    if (SubmitWorkStatusEnum.fromInt(statusValue.intValue()) != submitWork.getStatus()) {
                        isAdd = false;
                    }
                }
                if (filterMilestone != null) {
                    if (Long.parseLong(filterMilestone) != (submitWork.getMilestone().getMilestoneId())) {
                        isAdd = false;
                    }
                }
                if (keyword != null) {
                    if (!submitWork.getWork().getTitle().toLowerCase().contains(keyword.toLowerCase())) {
                        isAdd = false;
                    }
                }
                if (isAdd) {
                    dto = toDetail(submitWork);
                    if (submitWork.getSubmit().getMilestone().equals(currentSubmit.getMilestone())) {
                        dto.setFinalEvaluated(false);
                    } else {
                        for (WorkEval eval : submitWork.getWorkEvals()) {
                            if (eval.getMilestone().equals(currentSubmit.getMilestone())) {
                                dto.setFinalEvaluated(false);
                                break;
                            } else {
                                dto.setFinalEvaluated(true);

                            }
                        }
                    }
                    list.add(dto);
                    if (submitWork.getMilestone() != null) {
                        for (MilestoneFilterType type : milestoneList) {
                            if (type.getMilestoneId() == submitWork.getMilestone().getMilestoneId()) {
                                canAdd = false;
                                break;
                            }
                        }
                        if (canAdd) {
                            milestoneList.add(milestone);
                        }
                    }
                    if (!assigneeList.contains(submitWork.getSubmit().getClassUser().getUser().getAccountName())) {
                        assigneeList.add(submitWork.getSubmit().getClassUser().getUser().getAccountName());
                    }
                }
            }
        }
        SubmitDetailFilterDTO filterDTO = new SubmitDetailFilterDTO();
        filterDTO.setListResult(list);
        filterDTO.setStatusFilter(statusFilter);
        filterDTO.setAssigneeFilter(assigneeList);
        filterDTO.setMilestoneFilter(milestoneList);
        filterDTO.setMilestoneId(currentSubmit.getMilestone().getMilestoneId());
        return ResponseEntity.ok(filterDTO);
    }

    public SubmitDetailDTO toDetail(SubmitWork submitWork) {
        SubmitDetailDTO dto = new SubmitDetailDTO();
        SubmitWorkKey key = new SubmitWorkKey();
        dto.setId(submitWork.getSubmit().getSubmitId());
        if (submitWork.getSubmit().getGroup() != null) {
            dto.setTeam(submitWork.getSubmit().getGroup().getGroupCode());
        }
        key.setIssueId(submitWork.getWork().getIssueId());
        key.setSubmitId(submitWork.getSubmit().getSubmitId());
        dto.setSubmitWorkId(key);
        dto.setAssignee(submitWork.getSubmit().getClassUser().getUser().getAccountName());
        dto.setFullName(submitWork.getSubmit().getClassUser().getUser().getFullName());
        dto.setMilestone(submitWork.getMilestone().getTitle());
        dto.setRequirement(submitWork.getWork().getTitle());
        dto.setStatus(submitWork.getStatus());

        if (submitWork.getRejectReason() != null) {
            dto.setRejectReason(submitWork.getRejectReason());
        }

        if (!submitWork.getWorkEvals().isEmpty()) {
            WorkEval latestEval = new WorkEval();
            for (WorkEval eval : submitWork.getWorkEvals()) {
                if (latestEval.getCreatedDate() == null) {
                    latestEval = eval;
                    dto.setGrade(eval.getWorkEval());
                }
                if (latestEval.getCreatedDate().before(eval.getCreatedDate())) {
                    latestEval = eval;
                    dto.setGrade(eval.getWorkEval());
                }
            }
        } else {
            dto.setGrade(null);
        }
        return dto;
    }
}
