package swp490.g23.onlinelearningsystem.entities.issue.service.impl;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import swp490.g23.onlinelearningsystem.entities.class_setting.domain.ClassSetting;
import swp490.g23.onlinelearningsystem.entities.class_setting.repositories.ClassSettingRepository;
import swp490.g23.onlinelearningsystem.entities.class_user.domain.ClassUser;
import swp490.g23.onlinelearningsystem.entities.class_user.repositories.ClassUserRepositories;
import swp490.g23.onlinelearningsystem.entities.classes.domain.Classes;
import swp490.g23.onlinelearningsystem.entities.classes.repositories.ClassRepositories;
import swp490.g23.onlinelearningsystem.entities.group.domain.Group;
import swp490.g23.onlinelearningsystem.entities.group.repositories.GroupRepository;
import swp490.g23.onlinelearningsystem.entities.groupMember.domain.GroupMember;
import swp490.g23.onlinelearningsystem.entities.issue.domain.Issue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueAsigneeFilterDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilter;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueFilterValue;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueGroupFilterDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueMilestoneFilterDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.filter.IssueSettingFilterDto;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueBatchRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueFilterRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueMultiRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.request.IssueRequestDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueUserDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueDetailDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueGroupDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueListDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueMilestoneDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueViewDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueResponseDTO;
import swp490.g23.onlinelearningsystem.entities.issue.domain.response.IssueSettingDTO;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.IssueRepository;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.Criteria.IssueCriteria;
import swp490.g23.onlinelearningsystem.entities.issue.repositories.CriteriaEntity.IssueQuery;
import swp490.g23.onlinelearningsystem.entities.issue.service.IIssueService;
import swp490.g23.onlinelearningsystem.entities.milestone.domain.Milestone;
import swp490.g23.onlinelearningsystem.entities.milestone.repositories.MilestoneRepository;
import swp490.g23.onlinelearningsystem.entities.setting.domain.Setting;
import swp490.g23.onlinelearningsystem.entities.setting.repositories.SettingRepositories;
import swp490.g23.onlinelearningsystem.entities.submit.domain.Submit;
import swp490.g23.onlinelearningsystem.entities.submit_work.domain.SubmitWork;
import swp490.g23.onlinelearningsystem.entities.submit_work.repositories.SubmitWorkRepository;
import swp490.g23.onlinelearningsystem.entities.user.domain.User;
import swp490.g23.onlinelearningsystem.entities.user.repositories.UserRepository;
import swp490.g23.onlinelearningsystem.errorhandling.CustomException.CustomException;

@Service
public class IssueService implements IIssueService {

    @Autowired
    private IssueCriteria issueCriteria;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private SubmitWorkRepository workRepository;

    @Autowired
    private ClassSettingRepository classSettingRepository;

    @Autowired
    private ClassUserRepositories classUserRepositories;

    @Autowired
    private MilestoneRepository milestoneRepository;

    @Autowired
    private ClassRepositories classRepositories;

    @Autowired
    private SettingRepositories settingRepositories;

    @Override
    public ResponseEntity<IssueListDTO> getIssueList(int page, int limit, String keyword, String classCode,
            boolean isIssue, Long filterMilestoneId, IssueFilterRequestDTO filterRequestDTO) {
        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }

        IssueQuery result = issueCriteria.searchFilterQuery(keyword, classCode, isIssue, filterMilestoneId,
                filterRequestDTO);
        TypedQuery<Issue> queryResult = result.getResultQuery();
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

        List<Issue> issues = queryResult.getResultList();
        List<IssueResponseDTO> issueResponseDTOs = new ArrayList<>();
        for (Issue issue : issues) {
            issueResponseDTOs.add(toDto(issue));
        }

        IssueListDTO dto = new IssueListDTO();
        dto.setPage(page);
        dto.setTotalItem(totalItem);
        dto.setTotalPage(totalPage);
        dto.setIssueList(issueResponseDTOs);
        return ResponseEntity.ok(dto);
    }

    public IssueGroupFilterDTO toGroupFilterDto(Group group) {
        IssueGroupFilterDTO groupDTO = new IssueGroupFilterDTO();
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

    public IssueSettingFilterDto toSettingFilterDTO(ClassSetting setting) {
        IssueSettingFilterDto dto = new IssueSettingFilterDto();
        dto.setId(setting.getClassSettingId());
        dto.setTitle(setting.getSettingValue());
        return dto;
    }

    public IssueMilestoneFilterDTO toMilestoneFilterDto(Milestone milestone, List<Group> groupOfTrainee) {
        IssueMilestoneFilterDTO dto = new IssueMilestoneFilterDTO();
        dto.setAssignmentTitle(milestone.getAssignment().getTitle());
        dto.setMilestoneId(milestone.getMilestoneId());
        dto.setMilestoneTitle(milestone.getTitle());
        dto.setTeamwork(milestone.getAssignment().isTeamWork());
        dto.setStatus(milestone.getStatus().toString());
        List<IssueGroupFilterDTO> groups = new ArrayList<>();

        IssueGroupFilterDTO noGroup = new IssueGroupFilterDTO();
        List<String> noGroupMember = new ArrayList<>();
        noGroup.setGroupId((long) 0);
        noGroup.setGroupName("Waiting List");

        for (Submit submit : milestone.getSubmits()) {
            if (!groupOfTrainee.isEmpty()) {
                if (submit.getGroup() != null && groupOfTrainee.contains(submit.getGroup())) {

                    boolean exist = false;
                    for (IssueGroupFilterDTO groupFilterDTO : groups) {
                        if (groupFilterDTO.getGroupId() == submit.getGroup().getGroupId()) {
                            exist = true;
                            break;
                        }
                    }

                    if (exist == false) {
                        groups.add(toGroupFilterDto(submit.getGroup()));
                    }
                }

            } else {

                if (submit.getGroup() != null) {

                    boolean exist = false;
                    for (IssueGroupFilterDTO groupFilterDTO : groups) {
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

        }

        List<IssueFilterValue> requirements = new ArrayList<>();
        for (Issue issue : milestone.getIssues()) {
            if (issue.getType() == null) {
                requirements.add(new IssueFilterValue(issue.getTitle(), issue.getIssueId()));
            }
        }
        dto.setRequirements(requirements);

        if (groupOfTrainee.isEmpty()) {
            noGroup.setMemberId(noGroupMember);
            groups.add(noGroup);
        }

        dto.setGroups(groups);
        return dto;
    }

    public IssueAsigneeFilterDTO toAsigneeFilterDTO(User user) {
        IssueAsigneeFilterDTO asigneeDTO = new IssueAsigneeFilterDTO();
        asigneeDTO.setTraineeId(user.getUserId());
        asigneeDTO.setUsername(user.getAccountName());
        return asigneeDTO;
    }

    public IssueGroupDTO toGroupDTO(Group group) {
        IssueGroupDTO groupDTO = new IssueGroupDTO();
        groupDTO.setGroupCode(group.getGroupCode());
        groupDTO.setGroupTopic(group.getTopicName());
        groupDTO.setGroupId(group.getGroupId());
        return groupDTO;
    }

    public IssueResponseDTO toDto(Issue issue) {
        IssueResponseDTO dto = new IssueResponseDTO();
        Issue requirement = null;
        dto.setIssueId(issue.getIssueId());
        dto.setTitle(issue.getTitle());
        dto.setClassCode(issue.getClasses().getCode());
        if (issue.getSubmitWorks().isEmpty()) {
            dto.setSubmitted(false);
        } else {
            dto.setSubmitted(true);
        }

        if (issue.getType() != null) {
            dto.setType(issue.getType().getSettingTitle());
            if (issue.getRequirement() != null) {
                dto.setRequirement(issue.getRequirement().getTitle());
                requirement = issue.getRequirement();
            } 
        } else {
            requirement = issue;
        }

        if (issue.getDescription() != null) {
            dto.setDescription(issue.getDescription());
        }

        if (issue.getAsignee() != null) {
            dto.setAsignee(toUserDTO(issue.getAsignee()));
        }

        if (issue.getAuthor() != null) {
            dto.setAuthor(toUserDTO(issue.getAuthor()));
        }

        if (issue.getDeadline() != null) {
            dto.setDeadline(issue.getDeadline().toString());
        }

        if (issue.getGroup() != null) {
            dto.setGroup(toGroupDTO(issue.getGroup()));
        }

        if (issue.getMilestone() != null) {
            IssueMilestoneDTO milestoneViewDTO = new IssueMilestoneDTO();
            milestoneViewDTO.setMilestoneId(issue.getMilestone().getMilestoneId());
            milestoneViewDTO.setDeadline(issue.getMilestone().getToDate().toString());
            milestoneViewDTO.setTitle(issue.getMilestone().getTitle());
            dto.setMilestone(milestoneViewDTO);
        }

        if (issue.getCreatedDate() != null) {
            dto.setCreatedDate(issue.getCreatedDate().toString());
        }

        if (issue.getModifiedDate() != null) {
            dto.setModifiedDate(issue.getModifiedDate().toString());
        }

        if (issue.getModifiedBy() != null) {
            User lastEditor = userRepository.findUserWithEmail(issue.getModifiedBy());
            if (lastEditor != null) {
                dto.setModifiedBy(toUserDTO(lastEditor));
            }

        }

        if (issue.isClosed() != true) {
            if (issue.getStatus() != null) {
                dto.setStatus(issue.getStatus().getSettingTitle());
                dto.setStatusId(issue.getStatus().getClassSettingId());
            } else {
                dto.setStatus("Open");
                dto.setStatusId((long) 1);
            }

        } else {
            dto.setStatus("Closed");
            dto.setStatusId((long) 0);
        }

        if (requirement != null) {
            if (!requirement.getSubmitWorks().isEmpty()) {
                for (SubmitWork work : requirement.getSubmitWorks()) {
                    if (!work.getWorkEvals().isEmpty()) {
                        dto.setEvaluated(true);
                        break;
                    } else {
                        dto.setEvaluated(false);
                    }
                }
            } else {
                dto.setEvaluated(false);
            }

        } else {
            dto.setEvaluated(false);
        }

        return dto;
    }

    public IssueUserDTO toUserDTO(User user) {
        IssueUserDTO asigneeDTO = new IssueUserDTO();

        asigneeDTO.setFullName(user.getFullName());
        asigneeDTO.setUsername(user.getAccountName());
        asigneeDTO.setEmail(user.getEmail());
        asigneeDTO.setMobile(user.getMobile());
        asigneeDTO.setNote(user.getNote());
        asigneeDTO.setStatus(user.getStatus().toString());
        asigneeDTO.setUserId(user.getUserId());
        asigneeDTO.setAvatar_url(user.getAvatar_url());

        return asigneeDTO;
    }

    @Override
    public ResponseEntity<IssueFilter> issueListFilter(String classCode, User userAuthor, Long milestoneId) {
        IssueFilter filter = new IssueFilter();

        User author = userRepository.findById(userAuthor.getUserId())
                .orElseThrow(() -> new CustomException("author doesnt exist"));
        Setting traineeRole = settingRepositories.findBySettingValue("ROLE_TRAINEE");
        Setting trainerRole = settingRepositories.findBySettingValue("ROLE_TRAINER");

        List<Group> groupOfAuthor = new ArrayList<>();
        if (author.getSettings().contains(trainerRole)) {

        } else if (author.getSettings().contains(traineeRole)) {
            for (GroupMember groupMember : author.getGroupMembers()) {
                groupOfAuthor.add(groupMember.getGroup());
            }
        }

        List<User> asignees = userRepository.getIssueAsigneeOfClass(classCode);
        List<String> asigneeFilter = new ArrayList<>();
        for (User user : asignees) {
            asigneeFilter.add(user.getAccountName());
        }

        // List<Group> groups = groupRepository.getGroupOfIssueByClass(classCode);
        List<Group> groups = new ArrayList<>();
        if (milestoneId != null) {
            groups = groupRepository.findGroupByMilestone(milestoneId);
        }

        List<IssueGroupFilterDTO> groupDTOs = new ArrayList<>();
        for (Group group : groups) {
            groupDTOs.add(toGroupFilterDto(group));
        }

        List<Milestone> milestoneOfClass = milestoneRepository.getByClassCodeInProgressAndClosed(classCode);

        List<IssueMilestoneFilterDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneFilterDto(milestone, groupOfAuthor));
        }

        List<ClassSetting> typeAndStatusOfClass = classSettingRepository.getTypeAndStatusOfClass(classCode);
        List<IssueSettingFilterDto> typeFilter = new ArrayList<>();
        List<IssueSettingFilterDto> statusFilter = new ArrayList<>();
        for (ClassSetting setting : typeAndStatusOfClass) {
            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_STATUS")) {
                statusFilter.add(toSettingFilterDTO(setting));
            }

            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_TYPE")) {
                typeFilter.add(toSettingFilterDTO(setting));
            }
        }

        List<IssueFilterValue> requirementFilter = new ArrayList<>();
        List<Issue> requirementOfClass = issueRepository.getRequirementOfMilestone(milestoneId);
        for (Issue issue : requirementOfClass) {
            requirementFilter.add(new IssueFilterValue(issue.getTitle(), issue.getIssueId()));
        }

        filter.setAsigneeFilter(asigneeFilter);
        filter.setGroupFilter(groupDTOs);
        filter.setMilestoneFilter(dtos);
        filter.setStatusFilter(statusFilter);
        filter.setTypeFilter(typeFilter);
        filter.setRequirement(requirementFilter);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<IssueFilter> issueAddFilter(String classCode, User user) {

        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }

        User author = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new CustomException("author doesnt exist"));
        Setting traineeRole = settingRepositories.findBySettingValue("ROLE_TRAINEE");
        Setting trainerRole = settingRepositories.findBySettingValue("ROLE_TRAINER");

        List<Group> groupOfAuthor = new ArrayList<>();
        if (author.getSettings().contains(trainerRole)) {

        } else if (author.getSettings().contains(traineeRole)) {
            for (GroupMember groupMember : author.getGroupMembers()) {
                groupOfAuthor.add(groupMember.getGroup());
            }
        }

        List<Milestone> milestoneOfClass = milestoneRepository.getByClassCodeInProgress(classCode);
        List<IssueMilestoneFilterDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneFilterDto(milestone, groupOfAuthor));
        }

        List<ClassUser> traineeOfClass = classUserRepositories.findByClasses(classes);
        List<String> asigneeDTOs = new ArrayList<>();
        for (ClassUser classUser : traineeOfClass) {
            asigneeDTOs.add(classUser.getUser().getAccountName());
        }

        List<Group> groups = groupRepository.getGroupOfClass(classCode);
        List<IssueGroupFilterDTO> groupDTOs = new ArrayList<>();
        for (Group group : groups) {
            groupDTOs.add(toGroupFilterDto(group));
        }

        List<ClassSetting> typeAndStatusOfClass = classSettingRepository.getTypeAndStatusOfClass(classCode);
        List<IssueSettingFilterDto> typeFilter = new ArrayList<>();
        List<IssueSettingFilterDto> statusFilter = new ArrayList<>();
        for (ClassSetting setting : typeAndStatusOfClass) {
            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_STATUS")) {
                statusFilter.add(toSettingFilterDTO(setting));
            }

            if (setting.getType().getSettingValue().equals("TYPE_ISSUE_TYPE")) {
                typeFilter.add(toSettingFilterDTO(setting));
            }
        }

        List<IssueFilterValue> requirementFilter = new ArrayList<>();
        List<Issue> requirementOfClass = issueRepository.getRequirementOfClass(classCode);
        for (Issue issue : requirementOfClass) {
            requirementFilter.add(new IssueFilterValue(issue.getTitle(), issue.getIssueId()));
        }

        // filter.setAsigneeFilter(asigneeFilter);
        IssueFilter filter = new IssueFilter();
        filter.setGroupFilter(groupDTOs);
        filter.setMilestoneFilter(dtos);
        filter.setStatusFilter(statusFilter);
        filter.setTypeFilter(typeFilter);
        filter.setRequirement(requirementFilter);
        filter.setTraineesToAsign(asigneeDTOs);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<IssueFilter> requirementAddFilter(String classCode, User user) {
        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }

        User author = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new CustomException("author doesnt exist"));
        Setting traineeRole = settingRepositories.findBySettingValue("ROLE_TRAINEE");
        Setting trainerRole = settingRepositories.findBySettingValue("ROLE_TRAINER");

        List<Group> groupOfAuthor = new ArrayList<>();
        List<Milestone> milestoneOfClass = new ArrayList<>();
        if (author.getSettings().contains(trainerRole)) {
            milestoneOfClass = milestoneRepository.getByClassCodeInProgress(classCode);
        } else if (author.getSettings().contains(traineeRole)) {
            for (GroupMember groupMember : author.getGroupMembers()) {
                if (groupMember.getIsLeader() == true) {
                    groupOfAuthor.add(groupMember.getGroup());
                    for (Submit submit : groupMember.getGroup().getSubmits()) {
                        if (!milestoneOfClass.contains(submit.getMilestone())
                                && submit.getMilestone().getClasses().getCode().equals(classCode)) {
                            milestoneOfClass.add(submit.getMilestone());
                        }
                    }
                }
            }
        }

        List<IssueMilestoneFilterDTO> dtos = new ArrayList<>();
        for (Milestone milestone : milestoneOfClass) {
            dtos.add(toMilestoneFilterDto(milestone, groupOfAuthor));
        }

        IssueFilter filter = new IssueFilter();
        filter.setMilestoneFilter(dtos);
        return ResponseEntity.ok(filter);
    }

    @Override
    public ResponseEntity<IssueDetailDTO> issueDetail(Long issueId, User user) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(() -> new CustomException("Issue doesnt exist"));
        User author = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new CustomException("author doesnt exist"));
        Setting traineeRole = settingRepositories.findBySettingValue("ROLE_TRAINEE");
        Setting trainerRole = settingRepositories.findBySettingValue("ROLE_TRAINER");

        List<Group> groupOfAuthor = new ArrayList<>();
        if (author.getSettings().contains(trainerRole)) {

        } else if (author.getSettings().contains(traineeRole)) {
            for (GroupMember groupMember : author.getGroupMembers()) {
                groupOfAuthor.add(groupMember.getGroup());
            }
        }

        return ResponseEntity.ok(toIssueDetail(issue, groupOfAuthor));
    }

    public IssueViewDTO toIssueViewDTO(Issue requirement) {
        IssueViewDTO requirementDTO = new IssueViewDTO();
        requirementDTO.setId(requirement.getIssueId());
        requirementDTO.setTitle(requirement.getTitle());
        return requirementDTO;
    }

    public IssueDetailDTO toIssueDetail(Issue issue, List<Group> groupOfAuthor) {
        IssueDetailDTO detailDTO = new IssueDetailDTO();
        Issue requirement = null;
        detailDTO.setIssueId(issue.getIssueId());
        detailDTO.setTitle(issue.getTitle());
        detailDTO.setClassCode(issue.getClasses().getCode());

        if (issue.getType() != null) {
            detailDTO.setType(toSettingDTO(issue.getType()));
        } else {
            requirement = issue;
        }

        if (issue.getRequirement() != null) {
            detailDTO.setRequirement(toIssueViewDTO(issue.getRequirement()));
            requirement = issue.getRequirement();
        } else {
            IssueViewDTO dto = new IssueViewDTO();
            dto.setId((long) 0);
            dto.setTitle("General Requirement");
            detailDTO.setRequirement(dto);
        }

        if (issue.getDescription() != null) {
            detailDTO.setDescription(issue.getDescription());
        }

        if (issue.getAsignee() != null) {
            detailDTO.setAsignee(toUserDTO(issue.getAsignee()));
        } else {
            IssueUserDTO dto = new IssueUserDTO();
            dto.setUsername("Unassigned");
            detailDTO.setAsignee(dto);
        }

        if (issue.getDeadline() != null) {
            detailDTO.setDeadline(issue.getDeadline().toString());
        }

        if (issue.getGroup() != null) {
            detailDTO.setGroup(toGroupDTO(issue.getGroup()));
        } else {
            IssueGroupDTO groupDTO = new IssueGroupDTO();
            groupDTO.setGroupId((long) 0);
            groupDTO.setGroupCode("Waiting List");
            detailDTO.setGroup(groupDTO);
        }

        if (issue.getMilestone() != null) {
            detailDTO.setMilestone(toMilestoneFilterDto(issue.getMilestone(), groupOfAuthor));
        }

        if (issue.isClosed() != true) {
            if (issue.getStatus() != null) {
                detailDTO.setStatus(toSettingDTO(issue.getStatus()));
            } else {
                detailDTO.setStatus(new IssueSettingDTO((long) 1, "Open"));
            }

        } else {
            detailDTO.setStatus(new IssueSettingDTO((long) 0, "Close"));
        }

        if (issue.getIssueOfRequirement() != null) {
            List<IssueViewDTO> list = new ArrayList<>();
            for (Issue issueOfRequirement : issue.getIssueOfRequirement()) {
                list.add(toIssueViewDTO(issueOfRequirement));
            }
            detailDTO.setLinkedIssues(list);
        }

        if (requirement != null) {
            if (!requirement.getSubmitWorks().isEmpty()) {
                for (SubmitWork work : requirement.getSubmitWorks()) {
                    if (!work.getWorkEvals().isEmpty()) {
                        detailDTO.setEvaluated(true);
                        break;
                    } else {
                        detailDTO.setEvaluated(false);
                    }
                }
            } else {
                detailDTO.setEvaluated(false);
            }

        } else {
            detailDTO.setEvaluated(false);
        }
        return detailDTO;
    }

    public IssueSettingDTO toSettingDTO(ClassSetting setting) {
        IssueSettingDTO dto = new IssueSettingDTO();
        dto.setTitle(setting.getSettingValue());
        dto.setId(setting.getClassSettingId());
        return dto;
    }

    @Override
    public ResponseEntity<String> issueAdd(String classCode, IssueRequestDTO requestDTO, User user) {
        Classes classes = classRepositories.findClassByCode(classCode);
        if (classes == null) {
            throw new CustomException("Class doesnt exist");
        }
        User author = userRepository.findById(user.getUserId())
                .orElseThrow(() -> new CustomException("author doesnt exist"));
        Issue issue = new Issue();
        issue.setClasses(classes);
        issue.setAuthor(author);
        issue.setClosed(false);

        List<Issue> issues = new ArrayList<>();
        if (requestDTO.getTypeId() != null) {
            issues = issueRepository.getIssueByTitleOfClass(classCode, requestDTO.getTitle());
        } else {
            issues = issueRepository.getRequirementByTitleOfClass(classCode, requestDTO.getTitle());
        }

        if (!issues.isEmpty()) {
            throw new CustomException("Title already exist");
        }
        issue.setTitle(requestDTO.getTitle());

        if (requestDTO.getMilestoneId() != null) {
            Milestone milestone = milestoneRepository.findById(requestDTO.getMilestoneId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
            issue.setMilestone(milestone);
        }

        if (requestDTO.getGroupId() != null && requestDTO.getGroupId() != 0) {
            Group group = groupRepository.findById(requestDTO.getGroupId())
                    .orElseThrow(() -> new CustomException("Group doesnt exist"));
            issue.setGroup(group);
        }

        if (requestDTO.getAsigneeName() != null) {
            User aisgnee = userRepository.findByAccountName(requestDTO.getAsigneeName());
            issue.setAsignee(aisgnee);
        }

        if (requestDTO.getDescription() != null) {
            issue.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getDeadline() != null) {
            issue.setDeadline(LocalDate.parse(requestDTO.getDeadline()));
        }

        if (requestDTO.getTypeId() != null) {
            ClassSetting typeSeting = classSettingRepository.findById(requestDTO.getTypeId())
                    .orElseThrow(() -> new CustomException("Type doesnt exist"));
            issue.setType(typeSeting);

            if (requestDTO.getRequirementId() != null) {
                Issue requirement = issueRepository.findById(requestDTO.getRequirementId())
                        .orElseThrow(() -> new CustomException("Issue doesnt exist"));
                issue.setRequirement(requirement);
            }
        }

        issueRepository.save(issue);
        return ResponseEntity.ok("New issue added");
    }

    @Override
    public ResponseEntity<String> issueEdit(Long issueId, IssueRequestDTO requestDTO, User user) {
        Issue issue = issueRepository.findById(issueId).orElseThrow(() -> new CustomException("Issue doesnt exist"));

        if (!issue.getTitle().equals(requestDTO.getTitle())) {
            List<Issue> issues = new ArrayList<>();
            if (requestDTO.getTypeId() != null) {
                issues = issueRepository.getIssueByTitleOfClass(issue.getClasses().getCode(), requestDTO.getTitle());
            } else {
                issues = issueRepository.getRequirementByTitleOfClass(issue.getClasses().getCode(),
                        requestDTO.getTitle());
            }

            if (!issues.isEmpty()) {
                throw new CustomException("Title already exist");
            }
        }

        issue.setTitle(requestDTO.getTitle());

        if (requestDTO.getDeadline() != null) {
            issue.setDeadline(LocalDate.parse(requestDTO.getDeadline()));
        }
        if (requestDTO.getMilestoneId() != null) {
            Milestone milestone = milestoneRepository.findById(requestDTO.getMilestoneId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
            issue.setMilestone(milestone);

            if (issue.getIssueOfRequirement() != null) {
                List<Issue> unlinkedIssue = new ArrayList<>();
                for (Issue i : issue.getIssueOfRequirement()) {
                    i.setRequirement(null);
                    unlinkedIssue.add(i);
                }
                issueRepository.saveAll(unlinkedIssue);
            }
        }

        if (requestDTO.getGroupId() != null) {
            if (requestDTO.getGroupId() == 0) {
                issue.setGroup(null);
            } else {
                Group group = groupRepository.findById(requestDTO.getGroupId())
                        .orElseThrow(() -> new CustomException("Group doesnt exist"));
                issue.setGroup(group);
            }

        } else {
            issue.setGroup(null);
        }

        if (requestDTO.getAsigneeName() != null) {
            if (requestDTO.getAsigneeName().equalsIgnoreCase("Unassigned")) {
                issue.setAsignee(null);
            } else {
                User aisgnee = userRepository.findByAccountName(requestDTO.getAsigneeName());
                issue.setAsignee(aisgnee);
            }
        } else {
            issue.setAsignee(null);
        }

        if (requestDTO.getDescription() != null) {
            issue.setDescription(requestDTO.getDescription());
        }

        if (requestDTO.getTypeId() != null) {
            ClassSetting typeSeting = classSettingRepository.findById(requestDTO.getTypeId())
                    .orElseThrow(() -> new CustomException("Type doesnt exist"));
            issue.setType(typeSeting);

            if (requestDTO.getStatusId() != null) {
                if (requestDTO.getStatusId() == 0) {
                    issue.setStatus(null);
                    issue.setClosed(true);
                } else if (requestDTO.getStatusId() == 1) {
                    issue.setStatus(null);
                    issue.setClosed(false);
                } else {

                    ClassSetting statusSetting = classSettingRepository.findById(requestDTO.getStatusId())
                            .orElseThrow(() -> new CustomException("Status doesnt exist"));
                    issue.setStatus(statusSetting);
                    issue.setClosed(false);
                }

            }

            if (requestDTO.getRequirementId() != null) {

                if (requestDTO.getRequirementId() == 0) {
                    issue.setRequirement(null);
                } else {
                    Issue requirement = issueRepository.findById(requestDTO.getRequirementId())
                            .orElseThrow(() -> new CustomException("Issue doesnt exist"));
                    issue.setRequirement(requirement);
                }

            }

        }

        issueRepository.save(issue);
        return ResponseEntity.ok("issue updated ");
    }

    @Override
    public ResponseEntity<String> updateBatchIssue(IssueBatchRequestDTO requestDTO, User user) {
        List<Long> issueIds = requestDTO.getIssueToUpdate();
        List<Issue> issueList = new ArrayList<>();
        IssueRequestDTO changes = requestDTO.getUpdateToApply();

        ClassSetting typeSetting = null;
        ClassSetting statusSetting = null;
        User assignee = null;
        Milestone milestone = null;
        Issue requirement = null;
        Group group = null;

        if (changes.getMilestoneId() != null) {
            milestone = milestoneRepository.findById(changes.getMilestoneId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        }

        if (changes.getGroupId() != null && changes.getGroupId() != 0) {
            group = groupRepository.findById(changes.getGroupId())
                    .orElseThrow(() -> new CustomException("Group doesnt exist"));
        }

        if (changes.getRequirementId() != null && changes.getRequirementId() != 0) {
            requirement = issueRepository.findById(changes.getRequirementId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));
        }

        if (changes.getAsigneeName() != null && !changes.getAsigneeName().equalsIgnoreCase("Unassigned")) {
            assignee = userRepository.findByAccountName(changes.getAsigneeName());
            if (assignee == null) {
                throw new CustomException("assignee doesnt exist");
            }
        }

        if (changes.getTypeId() != null) {
            typeSetting = classSettingRepository.findById(changes.getTypeId())
                    .orElseThrow(() -> new CustomException("Type doesnt exist"));
        }

        if (changes.getStatusId() != null && changes.getStatusId() != 1 && changes.getStatusId() != 0) {
            statusSetting = classSettingRepository.findById(changes.getStatusId())
                    .orElseThrow(() -> new CustomException("Status doesnt exist"));
        }

        for (Long id : issueIds) {
            Issue issue = issueRepository.findById(id).get();

            if (changes.getMilestoneId() != null) {
                issue.setMilestone(milestone);
                if (issue.getIssueOfRequirement() != null) {
                    List<Issue> unlinkedIssue = new ArrayList<>();
                    for (Issue i : issue.getIssueOfRequirement()) {
                        i.setRequirement(null);
                        unlinkedIssue.add(i);
                    }
                    issueRepository.saveAll(unlinkedIssue);
                }

                if (changes.getGroupId() != null) {
                    if (changes.getGroupId() == 0) {
                        issue.setGroup(null);
                    } else if (group != null) {
                        issue.setGroup(group);
                    }
                } else {
                    issue.setGroup(null);
                }

                if (changes.getAsigneeName() != null) {
                    if (changes.getAsigneeName().equalsIgnoreCase("Unassigned")) {
                        issue.setAsignee(null);
                    } else if (assignee != null) {
                        issue.setAsignee(assignee);
                    }
                } else {
                    issue.setAsignee(null);
                }

            }

            if (changes.getRequirementId() != null) {
                if (changes.getRequirementId() == 0) {
                    issue.setRequirement(null);
                } else if (requirement != null) {
                    issue.setRequirement(requirement);
                }
            }

            if (changes.getTypeId() != null) {
                issue.setType(typeSetting);
            }

            if (changes.getStatusId() != null) {
                if (changes.getStatusId() == 1) {
                    issue.setStatus(null);
                    issue.setClosed(false);
                } else if (changes.getStatusId() == 0) {
                    issue.setStatus(null);
                    issue.setClosed(true);
                } else {
                    if (statusSetting != null) {
                        issue.setStatus(statusSetting);
                        issue.setClosed(false);
                    }
                }

            }

            if (changes.getDeadline() != null) {
                if (changes.getDeadline().equalsIgnoreCase("None")) {
                    issue.setDeadline(null);
                } else {
                    issue.setDeadline(LocalDate.parse(changes.getDeadline()));
                }
            }

            issueList.add(issue);
        }
        issueRepository.saveAll(issueList);
        return ResponseEntity.ok("all issue updated ");
    }

    @Override
    public ResponseEntity<String> issueMultiChange(User user, IssueMultiRequestDTO multiRequestDTO) {
        List<Issue> issuesNew = new ArrayList<>();
        List<SubmitWork> submitWorksNew = new ArrayList<>();
        for (IssueRequestDTO issueDTO : multiRequestDTO.getIssues()) {
            Issue issue = issueRepository.findById(issueDTO.getIssueId())
                    .orElseThrow(() -> new CustomException("Issue doesnt exist"));

            Milestone milestone = milestoneRepository.findById(issueDTO.getMilestoneId())
                    .orElseThrow(() -> new CustomException("Milestone doesnt exist"));

            if (issueDTO.getStatusId() != null) {
                if (issueDTO.getStatusId() == 0) {
                    issue.setStatus(null);
                    issue.setClosed(true);
                } else if (issueDTO.getStatusId() == 1) {
                    issue.setStatus(null);
                    issue.setClosed(false);
                } else {
                    ClassSetting statusSetting = classSettingRepository.findById(issueDTO.getStatusId())
                            .orElseThrow(() -> new CustomException("Status doesnt exist"));
                    issue.setStatus(statusSetting);
                    issue.setClosed(false);
                }

            }

            if (issue.getMilestone().equals(milestone)) {
                issuesNew.add(issue);
                continue;
            }

            issue.setMilestone(milestone);
            if (issue.getSubmitWorks() != null) {
                for (SubmitWork submitWork : issue.getSubmitWorks()) {
                    submitWorksNew.add(submitWork);
                }
            }

            issuesNew.add(issue);
        }
        issueRepository.saveAll(issuesNew);
        workRepository.deleteAll(submitWorksNew);
        return ResponseEntity.ok(issuesNew.size() + " issue updated");
    }

}
